import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CompanyUsers } from "@Modules";
import { CompanyInfoProps } from "./interfaces";
import { H, Image, Badge, Card, HomeContainer } from "@Components";
import { getPhoto } from '@Utils'
function CompanyInfo({ item }: CompanyInfoProps) {
  const { companyDetailsSelected } = useSelector(
    (state: any) => state.AdminReducer
  );

  const { display_name, attachment_logo, address, phone, email } = companyDetailsSelected;

  return (
    <div>
      <div>
        <HomeContainer>
          <Card>
            <div>
              <div className="text-center">
                <Image
                  variant={"rounded"}
                  size={"xxl"}
                  src={getPhoto(attachment_logo)}
                />
              </div>

              <div className="col-sm pt-3 pl-lg-5 pr-lg-5">
                <div className="text-center">
                  <H tag={"h3"} className="mb-0" text={display_name} />
                  <p className="text-sm">{address}</p>
                </div>

                <div className="col  justify-content-between pt-3 text-sm-0">
                  <div className="row">
                    <div className="col-11 pl-sm-0  ml-lg--4  ml-sm-0 ml--3 ">
                      <h6 className="text-uppercase text-muted mb-0">PHONE</h6>
                      <h5>{phone}</h5>
                    </div>
                    <div className="col-1 pl-lg-4 pl-lg-0 pl-sm-4 pl-sm-0">
                      <Badge pill color={"primary"} text={"Call"} />
                    </div>
                  </div>

                  <div className="row justify-content-between pt-1">
                    <div className="col-11 pl-sm-0 pl-0 pr-sm-0  ml-lg--4   mr-sm-0 ">
                      <h6 className="text-uppercase text-muted mb-0">E-MAIL</h6>
                      <h5>{email}</h5>
                    </div>
                    <div className="col-1 pl-sm-0">
                      <Badge pill color={"success"} text={"Email"} />
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </HomeContainer>
      </div>
      <div className="mt--4 ">
        <CompanyUsers />
      </div>
    </div>
  );
}

export { CompanyInfo };
