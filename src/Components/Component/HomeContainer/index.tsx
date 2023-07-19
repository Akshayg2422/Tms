import React from "react";
import { HomeContainerProps } from "./interfaces";

function HomeContainer({ children, title, className, type = 'default', style }: HomeContainerProps) {
  return (
    <>
      {type === 'default' && <div className={`${className}`} style={style}>{children}</div>}
      {type === 'card' &&
        <div
          className={`card ${className}`}
          style={style}
          title={title}
        >
          {children}
        </div>
      }
    </>
  );
}
export { HomeContainer };