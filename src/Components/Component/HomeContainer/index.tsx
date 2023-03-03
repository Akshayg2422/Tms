import React from "react";
import { HomeContainerProps } from "./interfaces";
import { Card } from '@Components'
function HomeContainer({ children, title, isCard = false, className  }: HomeContainerProps) {
  return (
    <>
      {!isCard ? <div className={`m-3 ${className}`}>{children}</div> : <div  className={`m-3 ${className}`} ><Card title={title}>{children}</Card></div>}
    </>
  );
}
export { HomeContainer };