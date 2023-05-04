import {
  Thread,
  IssueUsers,
  Attachments,
  ReferenceTickets,
} from "@Modules";
import { TicketInfo } from "@Modules";
import { HomeContainer, Tabs } from "@Components";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTabPosition } from '@Redux'

function TicketDetails() {

  const dispatch = useDispatch()
  const { selectedTabPositions } = useSelector(
    (state: any) => state.TaskReducer
  );


  const TABS = [
    { id: "1", title: <div className="bi bi-chat-text"><span className={'mx-1'}>Thread</span></div>, component: <Thread /> },
    { id: "2", title: <div className="bi bi-paperclip">ATTACH</div>, component: <Attachments /> },
    { id: "3", title: <div className="bi bi-search"><span className={'mx-1'}>REFERENCE</span></div>, component: <ReferenceTickets /> },
    { id: "4", title: <div className="bi bi-person-fill"><span className={'mx-1'}>USER</span></div>, component: <IssueUsers /> },
  ];


  return (
    <>
      <HomeContainer className="m-3">
        <div className="row">
          <div className="col-md-12" >
            <TicketInfo /*ref={ref}*/ />
          </div>
        </div>
        <div className="row mt--3">
          <div className="col">
            <Tabs tabs={TABS} selected={selectedTabPositions} onChange={ (item) => {
                dispatch(setSelectedTabPosition(item))
              }
            } />
          </div>
        </div>
      </HomeContainer>
    </>
  );
}

export { TicketDetails };
