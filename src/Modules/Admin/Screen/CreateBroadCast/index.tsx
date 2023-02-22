import {
  Button,
  DropDown,
  HomeContainer,
  Input,
  Radio,
  Dropzone,
  showToast,
  MultiSelectDropDown,
} from "@Components";
import { translate } from "@I18n";
import { getEmployees, addBroadCastMessages } from "@Redux";
import {
 CREATE_BROAD_CAST ,
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

  const { associatedCompanies} = useSelector(
    (state: any) => state.AdminReducer
  );

  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] =useState();
  const [photo, setPhoto] = useState<any>([]);
//   const [companyUserDashboard, setCompanyUserDashboard] = useState<any>();
  const [selectedCompany, setSelectedCompany] = useState<any>('');
  const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
  const [image, setImage] = useState("");

 
  const title = useInput("");
  const description = useInput("");

  const [selectedUser, setSelectedUser] = useState<any>();

  const handleImagePicker = (index: number, file: any) => {
    let newUpdatedPhoto = [...photo, file];
    setPhoto(newUpdatedPhoto);
  };

  const submitTicketHandler = () => {
    const params = {
      title: title?.value,
      description: description?.value,
      company_ids: {add:['',' ', ]},
      assigned_to_id: selectedUser?.id,
      broadcast_attachments:[{attachments:photo}],
    };

    const validation = validate(CREATE_BROAD_CAST , params);
    if (ifObjectExist(validation)) {
      dispatch(
        addBroadCastMessages({
          params,
          onSuccess: (response: any) => () => {
            goBack();
          },
          onError: (error) => () => { },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  };
  console.log(selectedCompany,"selectedCompany---------------------");
  const onSelectedTickets = (item: any) => {
    
    let updatedSelectedId: any = [...selectedCompany];
    if (selectedCompany?.length > 0) {
      const selectedItem = updatedSelectedId;
      const ifExist = selectedItem.some(
        (existEl: any) => existEl.id === item?.id
      );
      if (ifExist) {
        updatedSelectedId = selectedItem.filter(
          (filterItem: any) => filterItem.id !== item?.id
        );
      } else {
        updatedSelectedId = [...updatedSelectedId, item];
      }
    } else {
      updatedSelectedId = [item];
    }
    setSelectedCompany(updatedSelectedId);
  };

  useEffect(() => {
    let companies: any = [];

    if (associatedCompanies && associatedCompanies.length > 0) {
      associatedCompanies.forEach(({ branch_id, display_name }) => {
        companies = [
          ...companies,
          { key:branch_id, value: display_name, name: display_name },
        ];
      });

      setModifiedCompanyDropDownData(companies);
    }
  }, []);
  console.log(modifiedCompanyDropDownData,"modifiedCompanyDropDownData==============yyyyyyyyyyyyy");
  


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

          <Radio
            selected={typeSelect}
            data={type}
            onRadioChange={(selected) => {
            //   setSelectedCompany({});
            //   setSelectedUser(undefined);
              if (selected) {
                setTypeSelect(selected);
              }
            }}
          />
   {typeSelect && typeSelect?.id === "1" && (
          <MultiSelectDropDown
            heading={translate("common.company")!}
            options={modifiedCompanyDropDownData}
            displayValue={'value'}
            onSelect={(item) => {onSelectedTickets(item)}}
            onRemove={(item) => {onSelectedTickets(item) }}
          />
   )}
        </div>

        <div className="pl-3">
          <label className={`form-control-label`}>
            {translate("auth.logo")}
          </label>
        </div>

        <div className="col-md-9 col-lg-7 pb-4 pt-3">
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
          <div className="col-md-6 col-lg-4  my-4">
            <Button
              block
              text={translate("common.submit")}
              // onClick={submitTicketHandler}
            />
          </div>
        </div>
      </HomeContainer>
    </div>
  );
}

export { CreateBroadCast };
