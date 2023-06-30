
import { CompanyInfo, CompanyTickets, CompanyTasks } from "@Modules";

import { Tabs, Image, Back } from '@Components'
import { useState } from "react";
import { translate } from "@I18n";
import { icons } from "@Assets";
import { setSelectedTabPosition } from '@Redux'
import { useDispatch, useSelector } from "react-redux";
function CompanyDetails() {
  const dispatch = useDispatch()
  const { selectedTabPositions } = useSelector(
    (state: any) => state.TaskReducer
  );

  const TABS = [

    { id: "1", title: <div className="text-center"><Image src={selectedTabPositions.id === '1' ? icons.companyInfoPink : icons.companyInfo} height={16} width={16} /></div>, component: <CompanyInfo /> },
    { id: "2", title: <div className="text-center"><Image src={selectedTabPositions.id === '2' ? icons.companyTaskPink : icons.companyTask} height={16} width={16} /></div>, component: <CompanyTasks /> },
    { id: "3", title: <div className="text-center"><Image src={selectedTabPositions.id === '3' ? icons.issuesPink : icons.issues} height={16} width={16} /></div>, component: <CompanyTickets /> },
  ];

  return (

    <div className="m-3">
      <div className='row ml-1 mt--2'>
        <Back />
      </div>
      <Tabs tabs={TABS} selected={selectedTabPositions} onChange={(item) => {
        dispatch(setSelectedTabPosition(item))
      }} />
    </div>
  )
}

export { CompanyDetails }