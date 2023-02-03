import React from "react";
import { ModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";

function Modal({
  isOpen,
  children,
  title,
  size = "md",
  onClose,
  ...rest
}: ModalProps) {
  return (
    <RsModal
      className={`modal-dialog-centered modal-${size}`}
      isOpen={isOpen}
      {...rest}
    >
      <div className={"modal-header"}>
        {title && <h6 className={"modal-title"}>{title}</h6>}
        <button
          aria-label={"Close"}
          className={"close"}
          data-dismiss={"modal"}
          type={"button"}
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </RsModal>
  );
}

export { Modal };
export type { ModalProps };
