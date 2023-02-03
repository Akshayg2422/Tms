import React from "react";
import { ModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";
import { Spinner } from '@Components';

function Modal({
  isOpen,
  children,
  title,
  subTitle,
  size = "md",
  onClose,
  isHeaderChildren,
  isModalLoading,
  titleClassname,
  ...rest
}: ModalProps) {
  return (
    <RsModal
      className={`modal-dialog-centered modal-${size}`}
      isOpen={isOpen}
      fade={false}
      {...rest}
    >
      {isModalLoading  &&   <Spinner/>}
       <div className={"modal-header"}>
        {title && <h5 className={`modal-title col-8 ml--3 ${titleClassname}`}>{title}</h5>}
        {isHeaderChildren &&
          <>
            {isHeaderChildren}
          </>}
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
          <span aria-hidden={true} className="mr--2">×</span>
        </button>
      </div> 
      
      <div className="modal-body">{children}</div> 
    </RsModal>
  );
}

export { Modal };
export type { ModalProps };
