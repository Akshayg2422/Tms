import { useRef,useEffect,useLayoutEffect, useState } from "react";
import {
  Thread,
  IssueUsers,
  Attachments,
  ReferenceTickets,
} from "@Modules";
import { TicketInfo } from "@Modules";
import { HomeContainer, Tabs } from "@Components";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'

function TicketDetails() {

  const { selectedReferenceTickets } = useSelector((state: any) => state.AdminReducer);

  const { id } = useParams()

  const TABS = [
    { id: "1", title: <div className="bi bi-chat-text"><span className={'mx-1'}>Thread</span></div>, component: <Thread /> },
    { id: "2", title: <div className="bi bi-paperclip">ATTACH</div>, component: <Attachments /> },
    { id: "3", title: <div className="bi bi-search"><span className={'mx-1'}>REFERENCE</span></div>, component: <ReferenceTickets /> },
    { id: "4", title: <div className="bi bi-person-fill"><span className={'mx-1'}>USER</span></div>, component: <IssueUsers /> },
  ];

  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  useEffect(() => {
    setSelectedTab(TABS[0]);
  }, [selectedReferenceTickets ])

  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
      if (ref?.current) {
          setHeight(ref.current.offsetHeight);
      }
  }, []);


  return (
    <>
      <HomeContainer className="m-3">
            <div className="row">
                <div className="col-md-12" >
                    <TicketInfo ref={ref} />
                </div>
              
            </div>
            <div className="row mt--3">
                <div className="col">
                      <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
                </div>
            </div>
        </HomeContainer>
    </>
  );
}

export { TicketDetails };
