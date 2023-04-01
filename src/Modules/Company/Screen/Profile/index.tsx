import { H, Image, Badge, Card, HomeContainer, CommonTable } from "@Components";
import { getPhoto, handleEmailClick } from '@Utils';
import { useSelector } from "react-redux";
import { CompanyUsers } from "@Modules";
import { translate } from "@I18n";
import { log } from "console";

function Profile() {
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
   
     const { company, company_branch, permission_details, user_details,ticket_status  } = dashboardDetails ;

     
  return (
    <HomeContainer>
      <Card >
        <div className="mx-sm-0 mx--4">
          <div className="text-center">
          </div>
            <div className="text-center">
              <H tag={"h3"} className="mb-0" text={company.name} />
            </div>
          </div>
      </Card>
    </HomeContainer>
  )
}

export {Profile}