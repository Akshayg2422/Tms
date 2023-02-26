
import { TabPanel, useTabs } from "react-headless-tabs";
import { IssueUsers, Thread, ReferenceIssue } from "@Modules";
import { Tabs } from "@Components";




function IssueDetails() {

  return (

    <Tabs tabs={[{ id: '1', title: "Details", component: <>chat</> }, { id: '2', title: "Attachments", component: <>Attachments</> }, { id: '3', title: "Details", component: <>chat</> }, { id: '4', title: "Reference", component: <>Reference</>}]} />

  )
}

export { IssueDetails }