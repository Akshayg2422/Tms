import{ useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "@Utils//KeyPress";
import { CodeEditorWindow, OutputWindow } from "../../Container";
import { languageOptions } from "@Utils";
import defineTheme from "@Themes//DefaultThemes/defineTheme";
import { Button, Card } from "@Components";
import React from "react";


const CodeEditor = React.forwardRef((props, ref: any) => {
  const [code, setCode] = useState<any>('');
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState<any>(null);
  const [theme, setTheme] = useState<any>("cobalt");
  const [language, setLanguage] = useState<any>(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");


  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);


  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'be540c28a2mshbf8243112da8a31p1fbbc0jsn047ce0177a55',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: formData
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", err.response.data.message);
        }
        setProcessing(false);
      });
  };


  const checkStatus = async (token) => {

    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': 'be540c28a2mshbf8243112da8a31p1fbbc0jsn047ce0177a55',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast("");
    }
  };

  function handleThemeChange(th) {
    const theme = {
      key
        :
        "amy",
      label
        :
        "Amy",
      value
        :
        "amy"
    };
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      // defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }


  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (timer) => {
    toast.error(`Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <div className="container-fluid pt-3" id={'Code'} ref={ref}>
      {/* <div className='pb-4 display-3'>Code</div> */}
        <Card>
        <div className="row ">
         
          <div className="col-sm-8">
            <h2 className='mt--2 display-3'>Code Editor <span className="float-right" >
              <button type="button" className="btn btn-primary mt--1 btn-sm py-2 px-4 "  onClick={handleCompile}
                disabled={!code}>{processing ? "Processing..." : "Run" }
              </button>
            </span></h2>
            
            <div >
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
            </div>
          </div>
          <div className="col-sm-4  ">
            <OutputWindow outputDetails={outputDetails} />
            <div className="text-right mt--4">
            <Button text={'Submit'} size={'md'}/>
            </div>
          </div>

        </div>
        </Card>
      </div>
    </>

  );
}
)
export {CodeEditor};
