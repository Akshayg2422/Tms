import React, { useEffect } from "react";
import { ScreenWrapperProps } from "./interfaces";

function ScreenWrapper({ children }: ScreenWrapperProps) {
  return <div className={"main-content vh-100"}>{children}</div>;
}

export { ScreenWrapper };
