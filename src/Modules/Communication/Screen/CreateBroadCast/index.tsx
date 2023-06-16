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
  InputHeading
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
import { useInput, useNavigation } from "@Hooks";


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
  // const [selectedNoOfPickers, setSelectedNoOfPickers] = useState<any>()


  // let attach = photo.slice(-selectedNoOfPickers)

  // const handleImagePicker = (file: any) => {
  //   let newUpdatedPhoto = [...photo, file];
  //   setPhoto(newUpdatedPhoto);
  // };

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

      dispatch(
        addBroadCastMessages({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              showToast(response.message, 'success')
              goBack()
            }
          },
          onError: (error) => () => {
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
    <div>
      <HomeContainer type={'card'} className="m-3">
        <div className='row mx-3 d-inline-flex justify-content-center'>
          <Back />
          <div className='ml-2 text-center'><h3>{translate("auth.addBroadCast")!}</h3></div>
        </div>
        <hr className='mt-3'></hr>
        <div className="col-md-9 col-lg-7">
          <Input
            heading={translate("common.title")}
            value={title.value}
            onChange={title.onChange}
          />
          {/* <Input
            heading={translate("auth.description")}
            value={description.value}
            onChange={description.onChange}
          /> */}
          <div >
          <InputHeading heading={translate('auth.description')}/>
            <textarea 
              value={description.value}
              onChange={description.onChange}
              className="form-control form-control-sm" />
          </div>
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
        {/* 
        <div className="col">
          <label className={`form-control-label`}>
            {translate("common.attach")}
          </label>
        </div> */}

        {/* <div className="col-md-9 col-lg-7 pb-4 ">
          {selectDropzone &&
            selectDropzone.map((el: any, index: number) => {
              return (
                <Dropzone
                  variant="ICON"
                  icon={image}
                  size="xl"
                  onSelect={(image) => {
                    let file = image.toString().replace(/^data:(.*,)?/, "");
                    handleImagePicker(index, file);
                    setSelectDropzone([{ id: "1" }, { id: "2" }]);
                  }}
                />
              );
            })}
        </div> */}

        <div className="col-auto pb-2  mt--4">
          <div className="row">
            <ImagePicker
              size='xl'
              heading={translate("auth.attach")!}
              noOfFileImagePickers={3}
              onSelect={(image) => {
                // let file = image.toString().replace(/^data:(.*,)?/, "")
                // handleImagePicker(file)
              }}
              // onSelectImagePicker={(el) => {
              //   setSelectedNoOfPickers(el?.length)

              // }}

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

        <div className="row justify-content-end">
          <div className="">
            <Button
              block
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
