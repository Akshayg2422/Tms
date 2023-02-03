import React, { useState } from "react";
import { OutputStatusDetails } from "../OutputStatusDetails";
import {translate} from '@I18n'

const OutputWindow = ({ outputDetails }) => {

  

// console.log("22222222222222222222",atob(outputDetails.stderr));

//Exited with error status 1

  const getOutput = (id: any) => {
    let content: any
    switch (id) {
      case 6:
        content = (<div className="px-2 py-1 font-normal text-xs text-red">
          {atob(outputDetails?.compile_output)}
        </div>)
        break;
      case 3:
        content = (<pre className="font-normal text-xs text-green">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>)
        break;
      case 5:
        content = (
          <div className="px-2 py-1 font-normal text-xs text-red">
            {`Time Limit Exceeded`}
          </div>
        );
        break;
        case 11:
        content = (
          <div className="px-2 py-1 font-normal text-xs text-white">
            {atob(outputDetails.stderr)}
          </div>
        );
        break;
      default:
        content = (<div className="px-2 py-1 font-normal text-xs text-white"></div>)
    }
    return content
  };
  
  
  return (
    <>
      <h3 className="font-bold  mt-3">
        {outputDetails?.status?.id === 11 ? translate('common.error'):translate('common.result')}
      </h3>
      {outputDetails && <OutputStatusDetails outputDetails={outputDetails} />}
      <div className="card card-background bg-black " style={{ height:'60vh',width:'auto' }}>
        <div className="full-background"></div>
        <div className="pt-12 ml-3 mt-2 overflow-auto scroll-hidden">
          {outputDetails ? <div className="">{getOutput(outputDetails?.status?.id)}</div> : null}
        </div>
      </div>
    </>
  );
};

export {OutputWindow};
