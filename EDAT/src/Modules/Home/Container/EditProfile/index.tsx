import { Card, Input } from "@Components";
import { FC } from "react";
import { EditProfileProps } from "./interface";
import {translate} from '@I18n'


const EditProfile: FC<EditProfileProps> = ({ }) => {

  return (
    <>
      <Card title="Edit profile">
        <div className="mt--3">
          <h6 className="heading-small text-muted mb-3">
            {translate("course.userInformation")}
          </h6>
          <div className="pl-lg-4">
            <div className="row">
              <div className="col-lg-6">
                <Input
                  heading={translate("auth.userName")}
                  type={'text'}
                  id="input-username"
                  placeholder="Username"
                  defaultValue="lucky.jesse" />
              </div>
              <div className="col-lg-6">
                <Input
                  heading={translate("auth.email")}
                  id="input-email"
                  placeholder={'jesse@example.com'}
                  type={'email'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6" >
                <Input
                  heading={translate("auth.firstName")}
                  defaultValue="Lucky"
                  placeholder="First name"
                  type="text"
                  id={'input-first-name'}
                />
              </div>
              <div className="col-lg-6" >
                <Input
                  heading={translate("auth.lastName")}
                  defaultValue="Jesse"
                  id="input-last-name"
                  placeholder="Last name"
                  type="text"
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />

          <h6 className="heading-small text-muted mb-3">
          {translate("course.contactInformation")}
          </h6>
          <div className="pl-lg-4">
            <div className="row">
              <div className="col-md-12" >
                <Input
                  heading={translate("auth.address")}
                  defaultValue="Prithivi nagar, GNT Road, Gummindipooni"
                  id="input-address"
                  placeholder="Home Address"
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4" >
                <Input
                  heading={translate("auth.city")}
                  defaultValue="New York"
                  id="input-city"
                  placeholder="City"
                  type="text"
                />
              </div>
              <div className="col-lg-4">
                <Input
                  heading={'Country'}
                  defaultValue="United States"
                  id="input-country"
                  placeholder="Country"
                  type="text"
                />
              </div>
              <div className="col-lg-4" >
                <Input
                  heading={'Postal code'}
                  id="input-postal-code"
                  placeholder="Postal code"
                  type="number"
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />

          <h6 className="heading-small text-muted mb-3">About me</h6>
          <div className="pl-lg-4">
            <Input
              heading={'About Me'}
              placeholder="A few words about you ..."
              rows="4"
              type="textarea"
            />
          </div>
        </div>
      </Card>
    </>
  )
}
export { EditProfile };

