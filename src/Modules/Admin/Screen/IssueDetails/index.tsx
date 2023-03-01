
import { TabPanel, useTabs } from "react-headless-tabs";
import { IssueUsers, Thread, ReferenceIssue,ReferenceTickets,Attachments } from "@Modules";
import { Tabs } from "@Components";




function IssueDetails() {

  return (

    <Tabs tabs={[{ id: '1', title: "THREAD", component: <>chat</> }, { id: '2', title: "ATTACH", component:<Attachments/>  }, { id: '3', title: "reference", component: <ReferenceTickets/> }, { id: '4', title: "user", component: <IssueUsers/>}]} />

  )
}

export { IssueDetails }