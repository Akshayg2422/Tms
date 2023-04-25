import React from "react";
import { HomeContainerProps } from "./interfaces";
import { Card } from '@Components'
function HomeContainer({ children, title, className, type = 'default' }: HomeContainerProps) {
  return (
    <>
      {type === 'default' && <div className={`${className}`}>{children}</div>}
      {type === 'card' &&
        <div className={`${className}`} >
          <Card
            title={title}
          >{children}
          </Card>
        </div>}
    </>
  );
}
export { HomeContainer };