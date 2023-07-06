import {
  Chat,
  TicketUsers,
  TicketAttachments,
  ReferenceTickets,
} from "@Modules";
import { TicketInfo } from "@Modules";
import { HomeContainer, Tabs, Image } from "@Components";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTicketTabPosition } from '@Redux'
import { icons } from "@Assets";

function TicketDetails() {

  const dispatch = useDispatch()
  const { selectedTicketTabPosition } = useSelector((state: any) => state.TicketReducer);

  const TABS = [
    { id: "1", title: <div className="text-center pointer"><Image src={selectedTicketTabPosition.id === '1' ? icons.CommentsPink : icons.Comments} height={20} width={20} /></div>, component: <Chat /> },
    { id: "2", title: <div className="text-center pointer"><Image src={selectedTicketTabPosition.id === '2' ? icons.attachmentsPink : icons.attachments} height={16} width={16} /></div>, component: <TicketAttachments /> },
    { id: "3", title: <div className="text-center pointer"><Image src={selectedTicketTabPosition.id === '3' ? icons.referencePink : icons.reference} height={16} width={16} /></div>, component: <ReferenceTickets /> },
    { id: "4", title: <div className="text-center pointer"><Image src={selectedTicketTabPosition.id === '4' ? icons.usersPink : icons.users} height={16} width={16} /></div>, component: <TicketUsers /> },
  ];

  return (
    <>
      <HomeContainer className="m-3">
        <div className="row">
          <div className="col-md-12" >
            <TicketInfo />
          </div>
        </div>
        <div className="row mt--3">
          <div className="col">
            <Tabs tabs={TABS} selected={selectedTicketTabPosition} onChange={(item) => {
              dispatch(setSelectedTicketTabPosition(item))
            }
            } />
          </div>
        </div>
      </HomeContainer>
    </>
  );
}

export { TicketDetails };
