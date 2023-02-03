import React from "react";
import { Modal, ModalFooter } from "@Components";
import { UserValidateBusinessModalProps } from "./interfaces";

function UserValidateBusinessModal({
  text,
  primaryOnClick,
  secondaryOnClick,
  ...rest
}: UserValidateBusinessModalProps) {
  return (
    <Modal {...rest}>
      <p className="mb-4 card-text">{text}</p>
      <ModalFooter
        primary={"Proceed"}
        secondary={"Cancel"}
        primaryOnClick={primaryOnClick}
        secondaryOnClick={secondaryOnClick}
      />
    </Modal>
  );
}

export { UserValidateBusinessModal };
