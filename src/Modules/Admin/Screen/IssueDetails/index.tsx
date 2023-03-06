import { Tabs } from "@Components";
import {
  IssueUsers,
  Attachments,
  ReferenceTickets,
  Thread,
  TagAssignUser
} from "@Modules";


function IssueDetails() {

  return (
    <>
      <Tabs tabs={[{ id: '1', title: "THREAD", component: <Thread /> }, { id: '2', title: "ATTACH", component: <Attachments /> }, { id: '3', title: "reference", component: <ReferenceTickets /> }, { id: '4', title: "user", component: <IssueUsers /> }]} />
    </>
  )
}

export { IssueDetails }