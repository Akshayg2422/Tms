import {
  Button,
  HomeContainer,
  Input,
  Checkbox,
  Dropzone,
  showToast,
  MultiSelectDropDown,
  Back,
  ImagePicker,
  InputHeading,
  TextAreaInput
} from "@Components";
import { translate } from "@I18n";
import { addBroadCastMessages, setIsSync, getAssociatedCompanyBranch } from "@Redux";
import {
  CREATE_BROAD_CAST_EXTERNAL,
  CREATE_BROAD_CAST_INTERNAL,
  getValidateError,
  ifObjectExist,
  type,
  validate,
  getArrayFromArrayOfObject
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";


function CreateBroadCast() {

  const dispatch = useDispatch();
  const { goBack } = useNavigation();


  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
  const [photo, setPhoto] = useState<any>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<any>([]);
  // const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
  // const [image, setImage] = useState("");
  const title = useInput("");
  const description = useInput("");

  const [internalCheck, setInternalCheck] = useState(true)
  const [externalCheck, setExternalCheck] = useState(false)
  const [isExternalDisable, setExternalDisable] = useState(false)

  const isEnterPressed = useKeyPress("Enter");
  const   loginLoader=useLoader(false)

  useEffect(() => {
    if (isEnterPressed) {
      submitTicketHandler()
    }
  }, [isEnterPressed]);

  const submitTicketHandler = () => {

    const params = {
      title: title?.value,
      description: description?.value,
      ...(selectedCompanies.length > 0 && {
        applicable_branches: getArrayFromArrayOfObject(selectedCompanies, "key"),
      }),
      ...(internalCheck && { for_internal_company: true }),
      ...(externalCheck && { for_external_company: true }),
      broadcast_attachments: [{ attachments:photo }],
    };



    const validation = validate(externalCheck ? CREATE_BROAD_CAST_EXTERNAL : CREATE_BROAD_CAST_INTERNAL, params);
    if (ifObjectExist(validation)) {
      loginLoader.show()
      dispatch(
        addBroadCastMessages({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              loginLoader.hide()
              showToast(response.message, 'success')
              goBack()
            }
          },
          onError: (error) => () => {
            loginLoader.hide()
            showToast(error.error_message)
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  };

  useEffect(() => {
    const params = { q: "" };
    dispatch(
      getAssociatedCompanyBranch({
        params,
        onSuccess: (response: any) => () => {
          getCompanyBranchDropdown(response.details);
        },
        onError: () => () => {

        },
      })
    );
  }, []);


  const getCompanyBranchDropdown = (details: any) => {
    let companies: any = [];

    if (details && details.length > 0) {
      details.forEach(({ id, display_name }) => {
        companies = [
          ...companies,
          { key: id, value: display_name, name: display_name },
        ];
      });
      setModifiedCompanyDropDownData(companies);
      setExternalDisable(false)

    } else {
      setExternalDisable(true)
    }

  }



  return (
    <div className="m-3">
      <HomeContainer type={'card'} >
        <div className=" m-3">
        <div className={"col"}>
          <div className="row">
          <div ><Back /></div>
          <div className='ml-2 text-center'><h3>{translate("auth.addBroadCast")!}</h3></div>
          </div>
        
        </div>
        <hr className='mt-3'></hr>

        <div className="col-md-9 col-lg-7">
          <Input
            heading={translate("common.title")}
            value={title.value}
            onChange={title.onChange}
          />
         
              <TextAreaInput
                heading={translate('auth.description')!}
                value={description.value}
                onChange={description.onChange}
                className="form-control form-control-sm"
                
                />
          <div className="row col ">
            <div className="pr-3">
              <Checkbox
                id={'1'}
                disabled={isExternalDisable}
                defaultChecked={externalCheck}
                text={'External'}
                onCheckChange={
                  setExternalCheck
                }
              />
            </div>
            <Checkbox
              id={'2'}
              text={'Internal'}
              defaultChecked={internalCheck}
              onCheckChange={setInternalCheck}
            />
          </div>

          {externalCheck && (
            <MultiSelectDropDown
              heading={translate("common.company")!}
              options={modifiedCompanyDropDownData!}
              displayValue={"value"}
              onSelect={(item) => {
                setSelectedCompanies(item);
              }}
              onRemove={(item) => {
                setSelectedCompanies(item);
              }}
            />
          )}
        </div>
       

        <div className="col-auto pb-2  mt--4">
          <div className="row">
            <ImagePicker
              size='xl'
              heading={translate("auth.attach")!}
              noOfFileImagePickers={3}
              onSelect={(image) => {
      
              }}
         

              onSelectImagePickers={(el) => {
                let array: any = []

                for (let i = 0; i <= el.length; i++) {

                  let editPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                  if (editPickers !== undefined) {
                    array.push(editPickers)
                  }

                }
                setPhoto(array)

              }}


            />

          </div>


        </div>

        <div className="col mt-3">
         
            <Button
              loading={  loginLoader.loader}
              text={translate("common.submit")}
              onClick={submitTicketHandler}
            />
        
        </div>

        </div>
      </HomeContainer>
    </div>
  );
}

export { CreateBroadCast };
