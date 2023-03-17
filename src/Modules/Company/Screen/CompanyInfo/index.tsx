
import React from "react";
import { useSelector } from "react-redux";
import { CompanyUsers } from "@Modules";
import { CompanyInfoProps } from "./interfaces";
import { H, Image, Badge, Card, HomeContainer } from "@Components";
import { getPhoto, handleEmailClick } from '@Utils'
import { translate } from "@I18n";

function CompanyInfo({ item }: CompanyInfoProps) {

  const { companyDetailsSelected } = useSelector((state: any) => state.AdminReducer);
  const { display_name, attachment_logo, address, phone, email } = companyDetailsSelected;

  console.log("companyDetailsSelected34234-------------->",companyDetailsSelected);
  

  return (
    <HomeContainer>
      <Card >
        <div className="mx-sm-0 mx--4">
          <div className="text-center">
            <Image
              variant={"rounded"}
              size={"xxl"}
              src={getPhoto(attachment_logo)}
            />
          </div>
          <div className="col-sm pt-3 pl-0 pr-lg-0 pr-md-0 pr-sm-0">
            <div className="text-center">
              <H tag={"h3"} className="mb-0" text={display_name} />
              <p className="text-sm">{address}</p>
            </div>
            <div className="container-fluid mx-sm-0 mx--2">
              <div className="col justify-content-between pt-3 text-sm-0">
                <div className="row">
                  <div className="col-lg-9 col-sm-0 col-9">
                    <h6 className="text-uppercase text-muted mb-0"> {translate('common.phone')} </h6>
                    <h5>{phone}</h5>
                  </div>
                  <div className="col-lg-3 col-sm-0 col-3  text-right">
                    <Badge pill color={"info"} text={"Call"} style={{ cursor: 'pointer' }} />
                  </div>
                </div>

                <div className="row justify-content-between pt-1">
                  <div className="col-lg-9 col-sm-0 col-9">
                    <h6 className="text-uppercase text-muted mb-0"> {translate('common.email')} </h6>
                    <h5>{email}</h5>
                  </div>
                  <div className="col-lg-3 col-sm-0 col-3  text-right">
                    <Badge pill color="success" text={'e-mail'} style={{ cursor: 'pointer' }} onClick={() => { (handleEmailClick(email)) }} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <CompanyUsers />
    </HomeContainer>

  );
}

export { CompanyInfo };
