
import { CompanyInfo, CompanyIssues, } from "@Modules";

import { Tabs } from '@Components'
function CompanyDetails() {

  return (
    <Tabs tabs={[{ id: '1', title: 'Info', component: <CompanyInfo /> }, { id: '2', title: 'ISSUES', component: <CompanyIssues /> }]} />
  )
}

export { CompanyDetails }