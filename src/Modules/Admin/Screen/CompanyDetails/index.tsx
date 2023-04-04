
import { CompanyInfo, CompanyIssues, } from "@Modules";

import { Tabs } from '@Components'
import { useState } from "react";
function CompanyDetails() {
  const TABS = [
    { id: '1', title:<div className="bi bi-info-circle"><span className={'mx-1'}>INFO</span></div>, component: <CompanyInfo /> } ,
    { id: '2', title: <div className="bi bi-bug"><span className={'mx-1'}>ISSUES</span></div>, component: <CompanyIssues /> },
  ];
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
  
  )
}

export { CompanyDetails }