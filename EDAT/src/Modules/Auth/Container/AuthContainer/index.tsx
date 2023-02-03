import React from "react";
import { Card } from "@Components";
import { AuthContainerProps } from "./interfaces";
function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <Card className="col-sm-9 col-md-7">{children}</Card>
    </div>
  );
}

export { AuthContainer };
