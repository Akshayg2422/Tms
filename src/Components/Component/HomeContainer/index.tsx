import React from "react";
import { Card } from "@Components";
import { HomeContainerProps } from "./interfaces";
function HomeContainer({ children, title, isCard = false,className="col-sm-8" }: HomeContainerProps) {
  return (
    <div className="container-fluid">
        <div className="row my-4 justify-content-center">
          {isCard ? <Card className={className}  title={title}>{children}</Card> : <div className="col-sm-8">{children}</div>}
        </div>
     </div>
  );
}
export { HomeContainer };
