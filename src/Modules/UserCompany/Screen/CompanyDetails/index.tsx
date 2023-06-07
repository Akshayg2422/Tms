
import { CompanyInfo, CompanyTickets, CompanyTasks } from "@Modules";

import { Tabs } from '@Components'
import { useState } from "react";
import { translate } from "@I18n";
function CompanyDetails() {
  const TABS = [
    { id: '1', title: <div className="bi bi-info-circle"><span className={'mx-1'}>{translate('common.info')}</span></div>, component: <CompanyInfo /> },
    { id: '3', title: <div className="bi bi-bug"><span className={'mx-1'}>{translate('common.tasks')}</span></div>, component: <CompanyTasks /> },
    { id: '2', title: <div className="bi bi-bug"><span className={'mx-1'}>{translate('common.issues')}</span></div>, component: <CompanyTickets /> },

  ];
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <div className="m-3">
    <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
    </div>
  )
}

export { CompanyDetails }