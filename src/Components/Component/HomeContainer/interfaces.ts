import React from "react";

export interface HomeContainerProps {
  children?: React.ReactNode;
  title?: string;
  isCard?: boolean;
  className?: string;
  type?: 'default' | 'card'
}
