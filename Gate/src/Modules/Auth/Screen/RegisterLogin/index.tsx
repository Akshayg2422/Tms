import React from "react";
import { Card, Input, Button, Heading, Radio, Logo } from "@Components";
import { translate } from "@I18n";

function RegisterLogin() {


  return (
    <div className="container-fluid h-100vh pt-3">
      <div className="row">
        <div className="container col-sm-4 my-5">
          <Card>
            <br />
            <br />
            <Logo />
            <div className="col-sm-12">
              <Input
                heading={translate('auth.mobileNumber')}
                placeholder="00000 00000"
                type="text"
                inputMode="numeric"
                maxLength={10}
              />
            </div>
            <div className="col-sm-12 pt-2">
              <Heading variant="h5" heading={translate('auth.chooseLanguge')} />
            </div>
            <div className="row col-sm-12">
              {/* <span className="pl-3">
                <Radio type="radio" label="English" id={3} />
              </span>
              <span className="pl-4">
                <Radio type="radio" label="தமிழ்" id={4} />
              </span> */}
            </div>
            <div className="text-center pt-5">
              <Button color="primary" text={translate('common.next')} size="md" />
            </div>
            <br />
            <br />
          </Card>
        </div>
      </div>
    </div>
  );
}

export { RegisterLogin };
