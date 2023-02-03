import React from "react";
import { ModalFooterProps } from "./interfaces";
import { Button } from "@Components";
function ModalFooter({
  primary,
  secondary,
  primaryOnClick,
  secondaryOnClick,
}: ModalFooterProps) {
  return (
    <div className={"row mt-3 justify-content-center"}>
      <div className="col-sm-6">
        {secondary && (
          <Button
            color={"black"}
            block
            text={secondary}
            onClick={secondaryOnClick}
          />
        )}
      </div>
      <div className="col-sm-6 mt-2 mt-sm-0">
        {primary && <Button block text={primary} onClick={primaryOnClick} />}
      </div>
    </div>
  );
}
export { ModalFooter };
export type { ModalFooterProps };
