import React, { useEffect } from "react";
import { ScreenWrapperProps } from "./interfaces";
import { useWindowDimensions } from '@Hooks'

function ScreenWrapper({ children }: ScreenWrapperProps) {

  const { width, height } = useWindowDimensions()

  return <div style={{
    // height: height,
    // width: width
  }}>{children}</div>;
}

export { ScreenWrapper };
