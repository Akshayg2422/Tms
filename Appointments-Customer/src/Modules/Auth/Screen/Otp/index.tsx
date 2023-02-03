import React from "react";
import { Input, Button, Card } from "@Components";


function Otp() {
    const otp = [{}, {}, {}, {}]

    return (
        <div className="container  ">
            <div className="row">
                <div className="container  d-flex justify-content-center  align-items-center h-100">
                    <div className="col-7">
                        <Card>
                            <div className="py-3">
                                <div className="row justify-content-center mt-3">
                                    {otp.map((el) => {
                                        return (
                                            <Input className="m-2 text-center bg-secondary"
                                                maxlength="1"
                                                type={'number'}
                                                name="Otp"
                                                placeholder={"0"}
                                                style={{ width: "55px", height: "55px" }} />
                                        )
                                    }
                                    )}
                                </div>
                                <div className="text-center">
                                    <span className="text-sm"><small>Have not received the Verification code?</small></span>
                                    <p className="text-warning text-sm"><strong>00:45</strong></p>
                                </div>
                                <div className="row justify-content-center m-2">
                                    <Button text={"VERIFY"} block />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>


    )
}
export { Otp }