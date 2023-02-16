import {
  Button,
  DropDown,
  HomeContainer,
  Input,
  Radio,
  Dropzone,
  showToast,
} from "@Components";
import { translate } from "@I18n";
import { getEmployees, raiseNewTicket } from "@Redux";
import { CREATE_TICKET, getValidateError, ifObjectExist, type, validate } from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useDropDown, useNavigation } from "@Hooks";

function IssueCreate() {
  const dispatch = useDispatch();
  const {goBack} = useNavigation()

  const [typeSelect, setTypeSelect] = useState(type[0]);
  const { associatedCompanies, dashboardDetails } = useSelector(
    (state: any) => state.AdminReducer
  );
  console.log(associatedCompanies, "associatedCompanies,");

  const [companyDisplayName, setCompanyDisplayname] = useState();
  const [photo, setPhoto] = useState("");
  const [companyUser, setCompanyUser] = useState();
  const [companyUserDashboard, setCompanyUserDashboard] = useState();
  const [selectedId, setSelectedId] = useState("");

  const referenceNo = useInput("");
  const title = useInput("");
  const description = useInput("");

  const [userId, setUserId] = useState("");

  const submitTicketHandler = () => {


    const params = {
      title: title.value,
      description: description.value,
      reference_number: referenceNo.value,
      brand_branch_id: selectedId,
      assigned_to_id: userId,
      ticket_attachments: [{ attachments: [photo] }],
    };
    
    const validation = validate(CREATE_TICKET, params);
   if(ifObjectExist( validation)){

    dispatch(
      raiseNewTicket({
        params,
        onSuccess: (response: any) =>()=> {
          console.log(response,"=====================")
          goBack();
        },
        onError: (error) =>()=> {console.log(error,"----------------------");
        },
      })
    );
  }
  else {
    showToast(getValidateError(validation))
  }
  };

  useEffect(() => {
    let companies: any = [];

    associatedCompanies?.forEach(({ branch_id, display_name }) => {
      companies = [...companies, { id: branch_id, text: display_name }];
    });
    setCompanyDisplayname(companies);
  }, []);

  useEffect(() => {
    if (typeSelect.id === "2") {
      const params = {
        branch_id: dashboardDetails?.permission_details?.branch_id,
      };

      dispatch(
        getEmployees({
          params,
          onSuccess: (response: any) =>()=> {
            let companiesDashboard: any = [];
            response?.details?.forEach(({ id, name }) => {
              companiesDashboard = [...companiesDashboard, { id, text: name }];
              
            });
            // goBack();
            setCompanyUserDashboard(companiesDashboard);
          },
          onError: () =>()=> {},
        })
      );
    }
  }, [typeSelect]);

  return (
    <div>
      <HomeContainer isCard title={translate("common.createTicket")!}>
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
          <Input
            type={"number"}
            heading={translate("auth.referenceNo")}
            value={referenceNo.value}
            onChange={referenceNo.onChange}
          />
          <Radio
            selected={typeSelect}
            data={type}
            onRadioChange={(selected) => {
              if (selected) {
                setTypeSelect(selected);
              }
            }}
          />

          {typeSelect && typeSelect?.id === "1" && (
            <DropDown
              heading={translate("common.company")}
              data={companyDisplayName}
              onChange={(item) => {
                setSelectedId(item.id);

                const params = { branch_id: item.id };
                dispatch(
                  getEmployees({
                    params,
                    onSuccess: (response: any) =>()=> {
                      let companyUser: any = [];
                      response?.details?.forEach(({ id, name }) => {
                        companyUser = [...companyUser, { id, text: name }];
                      });
                      setCompanyUser(companyUser);
                    },
                    onError: () =>()=> {},
                  })
                );
              }}
            />
          )}

          {typeSelect && typeSelect.id === "1" ? (
            <DropDown
              heading={translate("common.user")}
              data={companyUser}
              onChange={(item) => {
                setUserId(item.id);
              }}
            />
          ) : (
            <DropDown
              heading={translate("common.user")}
              data={companyUserDashboard}
            />
          )}
        </div>
        <div className="pl-3">
          <label className={`form-control-label`}>
            {translate("auth.logo")}
          </label>
        </div>

        <div className="col-md-9 col-lg-7 pb-4 pt-3">
          <Dropzone
            variant="ICON"
            icon={photo}
            size="xl"
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, "");
              setPhoto(encoded);
            }}
          />
        </div>

        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4  my-4">
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

export {IssueCreate}

