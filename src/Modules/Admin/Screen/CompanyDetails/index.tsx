
import { CompanyInfo, CompanyIssues, } from "@Modules";

import { Tabs } from '@Components'
import { useState } from "react";
function CompanyDetails() {
  const TABS = [
    { id: '1', title: 'Info', component: <CompanyInfo /> } ,
    { id: '2', title: 'ISSUES', component: <CompanyIssues /> },
  ];
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
  
  )
}

export { CompanyDetails }