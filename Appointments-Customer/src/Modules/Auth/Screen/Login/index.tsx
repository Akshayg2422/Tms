import React, { useEffect } from "react";
import { Card, Input, Button, Heading, Radio } from "@Components";
import { Logo } from "../../Container";
import { translate } from "@I18n";




function Login() {
  return (
    <div className="container-fluid h-100vh pt-3">
      <div className="row">
        <div className="container col-sm-5 my-5">
          <Card>
            <Logo />
            <div className="col-sm-12 mt-5">
              <Input
                heading={translate('auth.mobileNumber')}
                placeholder={'00000 00000'}
                type="text"
                inputMode="numeric"
                maxLength={10}
              />
              <Heading variant="h5" heading={translate('auth.chooseLanguge')} />

              <div className="row">
                {/* <span className="pl-3">
                  <Radio type="radio" label="English" id={1} />
                </span>
                <span className="pl-4">
                  <Radio type="radio" label="தமிழ்" id={2} />
                </span> */}
              </div>


              <div className="text-center pt-5">
                <Button color="primary" text={translate('common.submit')} size="md" block />
              </div>
              <div className="text-center pt-2 mb-4">
                <small>{translate('common.register')}</small>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { Login };
