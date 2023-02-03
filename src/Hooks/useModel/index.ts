import React, { useState } from "react";

const useModal = (initialValue: boolean) => {
  const [visible, setVisible] = useState(initialValue);
  const handleModalClose = (isOpen: boolean) => {
    setVisible(isOpen);
  };

  return {
    visible,
    onChange: handleModalClose,
  };
};

export { useModal };
