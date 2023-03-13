import {
  Button,
  HomeContainer,
  Input,
  Radio,
  Dropzone,
  showToast,
  MultiSelectDropDown,
} from "@Components";
import { translate } from "@I18n";
import {addBroadCastMessages ,setIsSync,getAssociatedCompanyBranch} from "@Redux";
import {
  CREATE_BROAD_CAST_EXTERNAL,
  CREATE_BROAD_CAST_INTERNAL,
  getValidateError,
  ifObjectExist,
  type,
  validate,
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useNavigation } from "@Hooks";


function CreateBroadCast() {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const [typeSelect, setTypeSelect] = useState(type[0]);
  const [isSelect, setIsSelect] = useState(false);
  const { companyBranchNames } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
  const [photo, setPhoto] = useState<any>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<any>([]);
  const [ selectedCompany, setSelectedCompany] = useState<any>("");
  const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
  const [image, setImage] = useState("");
  const title = useInput("");
  const description = useInput("");

  const handleImagePicker = (index: number, file: any) => {
    let newUpdatedPhoto = [...photo, file];
    setPhoto(newUpdatedPhoto);
  };

  const submitTicketHandler = () => {
    const params = {
      title: title?.value,
      description: description?.value,
      ...(selectedCompanyId.length > 0 && {
        applicable_branches_ids: { add: selectedCompanyId },
      }),
      broadcast_attachments: [{ attachments: photo }],
    };


    const validation = validate(typeSelect?.id === "1"?CREATE_BROAD_CAST_EXTERNAL:CREATE_BROAD_CAST_INTERNAL, params);


    
    if (ifObjectExist(validation)) {
      dispatch(
        addBroadCastMessages({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              showToast(response.message, 'success')
              goBack()
            }
            dispatch(setIsSync({
              ...isSync, broadcast: false
          }))
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
        onSuccess: () => () => {
          dispatch(setIsSync({
            ...isSync, companies: true
          }))
        },
        onError: () => () => { },
      })
    );
  
  }, []);

  useEffect(() => {
    let companies: any = [];
    if (selectedCompany && selectedCompany?.length > 0) {
      selectedCompany?.forEach(({ key, name }) => {
        companies = [...companies, key];
      });
      setSelectedCompanyId(companies);
    }
  }, [selectedCompany]);
  useEffect(() => {
    const params = { q: "" };
    dispatch(
      getAssociatedCompanyBranch({
        params,
        onSuccess: () => () => {
          dispatch(setIsSync({
            ...isSync, companies: false
          }))
        },
        onError: () => () => { },
      })
    );
  
  }, []);

  useEffect(() => {
    let companies: any = [];

    if (companyBranchNames && companyBranchNames?.length > 0) {
      companyBranchNames?.forEach(({ branch_id, display_name }) => {
        companies = [
          ...companies,
          { key: branch_id, value: display_name, name: display_name },
        ];
      });

      setModifiedCompanyDropDownData(companies);
    }
    else{
      setTypeSelect(type[1])
      setIsSelect(true)
    }
  }, []);

  return (
    <div>
      <HomeContainer isCard title={translate("auth.createBroadCast")!}>
        <div className="col-md-9 col-lg-7">
          <Input
            heading={translate("auth.title")}
            value={title.value}
            onChange={title.onChange}
          />
          <Input
            heading={translate("auth.description")}
            value={description.value}
            onChange={description.onChange}
          />
<div   onClick={() => {
              isSelect &&
                showToast("there is no associatedBranches in this company");
            }}>
          <Radio
            selected={typeSelect}
            data={type}
            disableId={isSelect ? type[1] : ""}
            selectItem={typeSelect}
            onRadioChange={(selected) => {
              setTypeSelect(selected);
              setSelectedCompanyId([]);
            }}

          />
          </div>
          {typeSelect && typeSelect?.id === "1" && (
            <MultiSelectDropDown
              heading={translate("common.company")!}
              options={modifiedCompanyDropDownData!}
              displayValue={"value"}
              onSelect={(item) => {
                setSelectedCompany(item);
              }}
              onRemove={(item) => {
                setSelectedCompany(item);
              }}
            />
          )}
        </div>

        <div className="col">
          <label className={`form-control-label`}>
          {translate("auth.attach")}
          </label>
        </div>

        <div className="col-md-9 col-lg-7 pb-4 ">
          {selectDropzone &&
            selectDropzone.map((el, index) => {
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
        </div>

        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4 ">
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
