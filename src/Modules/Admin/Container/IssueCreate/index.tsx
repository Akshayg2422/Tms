import { Button, DropDown, HomeContainer, Input, Radio,  Dropzone } from "@Components";
import { translate } from "@I18n";
import { getEmployees } from "@Redux";
import { type } from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useInput,
  useDropDown,
  useNavigation
} from '@Hooks'

function IssueCreate() {
  const dispatch = useDispatch();
  const [typeSelect, setTypeSelect] = useState(type[0]);
  const { associatedCompanies, dashboardDetails } = useSelector(
    (state: any) => state.AdminReducer
  );
  const [companyDisplayName, setCompanyDisplayname] = useState();
  const [photo, setPhoto] = useState('')
  const [companyUser, setCompanyUser] = useState();
  const [companyUserDashboard, setCompanyUserDashboard] = useState();

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
          onSuccess: (response: any) => {
           
            let companiesDashboard: any = [];
            response?.details?.forEach(({ id, name }) => {
              companiesDashboard = [...companiesDashboard, { id, text: name }];
            });
            setCompanyUserDashboard(companiesDashboard);
          },
          onError: () => {},
        })
      );
    }
  }, [typeSelect]);

  return (
    <div>
      <HomeContainer isCard title={translate("common.createTicket")!}>
        <div className="col-md-9 col-lg-7">
          <Input heading={translate("auth.title")} />
          <Input heading={translate("auth.description")} />
          <Input type={"number"} heading={translate("auth.referenceNo")} />
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
                const params = { branch_id: item.id };
                dispatch(
                  getEmployees({
                    params,
                    onSuccess: (response: any) => {
                      let companyUsers: any = [];
                      response?.details?.forEach(({ id, name }) => {
                        companyUsers = [...companyUsers, { id, text: name }];
                      });
                      setCompanyUser(companyUsers);
                    },
                    onError: () => {},
                  })
                );
              }}
            />
          )}

          {typeSelect && typeSelect.id === "1" ? (
            <DropDown heading={translate("common.user")} data={companyUser} />
          ) : (
            <DropDown
              heading={translate("common.user")}
              data={companyUserDashboard}
            />
          )}
        </div>
        <div className="pl-3">
        <label className={`form-control-label`}>{translate('auth.logo')}</label>
        </div>
       
        <div className='col-md-9 col-lg-7 pb-4 pt-3'>
        <Dropzone variant='ICON'
          icon={photo}
          size='xl'
          onSelect={(image) => {
            let encoded = image.toString().replace(/^data:(.*,)?/, '');
            setPhoto(encoded)
          }}
        />
      </div>

        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4  my-4">
            <Button block text={translate("common.submit")} />
          </div>
        </div>
      </HomeContainer>
    </div>
  );
}

export { IssueCreate };
