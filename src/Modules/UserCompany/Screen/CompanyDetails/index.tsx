
import { CompanyInfo, CompanyTickets, CompanyTasks } from "@Modules";

import { Tabs,Image, Back } from '@Components'
import { useState } from "react";
import { translate } from "@I18n";
import { icons } from "@Assets";
import { setSelectedTabPosition } from '@Redux'
import { useDispatch, useSelector } from "react-redux";
function CompanyDetails() {
  const dispatch = useDispatch()
    const { selectedTabPositions } = useSelector(
        (state: any) => state.TaskReducer
    );

  const TABS = [
    // { id: '1', title: <div className="bi bi-info-circle "><span className={'mx-'}></span></div>, component: <CompanyInfo /> },
    // { id: '3', title: <div className="bi bi-bug text-center"><span className={'mx-1'}></span></div>, component: <CompanyTasks /> },
    // { id: '2', title: <div className="bi bi-bug text-center"><span className={'mx-1'}></span></div>, component: <CompanyTickets /> },

    { id: "1", title: <div className="text-center"><Image src={selectedTabPositions.id==='1' ? icons.CommentsPink : icons.Comments} height={16} width={16} /></div>, component: <CompanyInfo />  },
    { id: "2", title: <div className="text-center"><Image src={selectedTabPositions.id==='2' ? icons.attachmentsPink : icons.attachments} height={16} width={16} /></div>, component: <CompanyTasks /> },
    { id: "3", title: <div className="text-center"><Image src={selectedTabPositions.id==='3' ? icons.referencePink : icons.reference} height={16} width={16} /></div>, component: <CompanyTickets /> },


  ];
  // const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
  
    <div className="m-3">
      <div className='row ml-1 mt--2'>
                <Back />
                {/* <h3 className=' ml-2'>{translate('common.back')}</h3> */}
            </div>
    <Tabs tabs={TABS} selected={selectedTabPositions} onChange={(item) => {
                        dispatch(setSelectedTabPosition(item))
                    }} />
    </div>
  )
}

export { CompanyDetails }