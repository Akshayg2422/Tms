// import React from "react";
import React, { useState } from "react";
import {translate} from '@I18n'


const OutputStatusDetails = ({ outputDetails }) => {
 
  return (
    <div className="mt-2">
      <p className="text-sm">
        {translate('common.status')}:{" "}
        <span className={`font-weight-bold px-2 ${outputDetails?.status?.description === 'Accepted' ? 'text-green' : 'text-red'}`}>
          {outputDetails?.status?.description }
        </span>
      </p>
      {/* <p className="text-sm">
        Memory:{" "}
        <span className="font-weight-bold px-2 py-1 rounded-md text-black">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-weight-bold px-2 py-1 rounded-md text-black">
          {outputDetails?.time}
        </span>
      </p> */}
    </div>
  );
};

export{OutputStatusDetails};
