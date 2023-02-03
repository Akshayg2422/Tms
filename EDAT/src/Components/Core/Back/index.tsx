import React from "react";
import { Image } from "@Components";
import { icons } from "@Assets";
import { useNavigation } from '@Hooks'

interface BackArrowProps {
  backgroundColor?: string;
  col?: String;
  additionClass?: string;
  text?:string;
}

const Back = ({ additionClass, col, text }: BackArrowProps) => {
  const { goBack } = useNavigation()

  function isExist(val: any) {
    return val ? val : ''
  }

  return (
    <div className="row mt-3">
      <div
        className={`${isExist(additionClass)} ${isExist(col)} mb-3 ml-3 `}

      >
        <Image src={icons.back} height={20} width={24} onClick={() => goBack()} />
      </div>
      <div className="ml-3">
        <h3>{text}</h3>
      </div>
    </div>
  );
};
export { Back };
