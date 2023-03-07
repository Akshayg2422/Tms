import { useEffect, useState } from "react";
import {
  Thread,
  IssueUsers,
  Attachments,
  ReferenceTickets,
} from "@Modules";
import { Tabs } from "@Components";
import { useSelector } from "react-redux";

function IssueDetails() {


  const { selectedIssues, selectedReferenceIssues } = useSelector((state: any) => state.AdminReducer);
  const TABS = [
    { id: "1", title: "THREAD", component: <Thread /> },
    { id: "2", title: "ATTACH", component: <Attachments /> },
    { id: "3", title: "reference", component: <ReferenceTickets /> },
    { id: "4", title: "user", component: <IssueUsers /> },
  ];

  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  useEffect(() => {
    setSelectedTab(TABS[0]);

  }, [selectedReferenceIssues])

  return (
    <>
      <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
    </>
  );
}

export { IssueDetails };
