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

  // const { selectedReferenceIssues } = useSelector((state: any) => state.AdminReducer);

  const TABS = [
    { id: "1", title:<div className="bi bi-chat-text"><span className={'mx-1'}>Thread</span></div>,component: <Thread /> },
    { id: "2", title:  <div className="bi bi-paperclip">ATTACH</div>, component: <Attachments /> },
    { id: "3", title: <div className="bi bi-search"><span className={'mx-1'}>REFERENCE</span></div>, component: <ReferenceTickets /> },
    { id: "4", title:<div className="bi bi-person-fill"><span className={'mx-1'}>USER</span></div>, component: <IssueUsers /> },
  ];

  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  useEffect(() => {
    setSelectedTab(TABS[0]);
  }, [])

  return (
    <>
      <div style={{ cursor: 'pointer' }}>
        <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
      </div>
    </>
  );
}

export { IssueDetails };
