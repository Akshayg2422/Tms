import { H, Image, HomeContainer } from "@Components";
import { getPhoto } from '@Utils';
import { useSelector } from "react-redux";
import { translate } from "@I18n";

function Profile() {
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
  const { company, company_branch, permission_details, user_details, ticket_status } =  dashboardDetails;


  return (
    <HomeContainer isCard>
      <div>
        <div className="text-center">
          <H tag={"h3"} className="mb-0" text={company?.name} />
        </div>
        <hr></hr>
        {user_details && user_details?.profile_photo && <Image variant={'rounded'} src={getPhoto(user_details?.profile_photo)} />}
        <div>
          <span className="h4 pr-2"> Name :</span>
          {user_details?.name}
        </div>
        <div className="pt-2">
          <span className="h4 pr-2"> Phone :</span>
          {user_details?.phone}
        </div>
        <div className="pt-2">
          <span className="h4 pr-2"> Email :</span>
          {user_details?.email}
        </div>
      </div>


    </HomeContainer>
  )
}

export { Profile }