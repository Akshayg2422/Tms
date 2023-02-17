/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { useSelector } from "react-redux";
import { CompanyUsers,CompanyIssues } from "@Modules";
import { CompanyInfoProps } from "./interfaces";
import { H, Image, Badge, Card, HomeContainer, Color, RsBadgeProps } from "@Components";
import { getPhoto, handleEmailClick } from '@Utils'

export interface BadgeProps extends RsBadgeProps {
  text?: string | null | undefined
  color?: Color
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  email?: any
  button?: any
  className?: string
}

function CompanyInfo({ item }: CompanyInfoProps) {



  const { companyDetailsSelected } = useSelector((state: any) => state.AdminReducer);
  const { getEmployeeDetails } = useSelector((state: any) => state.CompanyReducer);

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

              <div className="col-sm pt-3 pl-0 pr-lg-0 pr-md-0 pr-sm-0">
                <div className="text-center">
                  <H tag={"h3"} className="mb-0" text={display_name} />
                  <p className="text-sm">{address}</p>
                </div>

                <div className="col justify-content-between pt-3 text-sm-0">
                  <div className="row">
                    <div className="col-10">
                      <h6 className="text-uppercase text-muted mb-0">PHONE</h6>
                      <h5>{phone}</h5>
                    </div>
                    <div className="col-2">
                      <Badge pill color={"primary"} text={"Call"} style={{cursor:'pointer'}}/>
                    </div>
                  </div>

                  <div className="row justify-content-between pt-1">
                    <div className="col-10">
                      <h6 className="text-uppercase text-muted mb-0">E-MAIL</h6>
                      <h5>{email}</h5>
                    </div>
                    <div className="col-2">
                      <Badge pill color="success" text={'e-mail'} style={{cursor:'pointer'}} onClick={() => { (handleEmailClick(email)) }} />
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

      <div>
        <CompanyIssues/>
      </div>
    </div>
  );
}

export { CompanyInfo };
