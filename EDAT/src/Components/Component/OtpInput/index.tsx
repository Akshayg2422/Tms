import React from "react";
import { OtpInputProps } from "./interfaces";
import { Input } from "@Components";
function OtpInput({ ...props }: OtpInputProps) {
  return (
    <Input
      {...props}
      className={"text-center bg-secondary ml-2 font-weight-bold mb-0"}
      maxlength={1}
      type={"number"}
      placeholder={"0"}
      style={{ width: "50px", height: "50px", fontSize: "16px" }}
    />
  );
}

export { OtpInput };
