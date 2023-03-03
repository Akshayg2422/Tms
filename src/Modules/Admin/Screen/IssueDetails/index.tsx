import {
  useEffect,
  useState,
} from "react";
import {
  DropDownMenuArrow,
  IssueUsers,
  Attachments,
  ReferenceTickets
} from "@Modules";
import {
  Divider,
  Modal,
  Tabs,
  H,
  Button,
  Image,
} from "@Components";
import {
  useDispatch,
  useSelector
} from "react-redux";
import {
  addTicketEvent,
  getEmployees,
  getTicketsEvents
} from "@Redux";
import { translate } from "@I18n";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { icons } from "@Assets";


function IssueDetails() {

  const [openModalTagUser, setOpenModalTagUser] = useState(false)
  const [openModalReassignUser, setOpenModalReassignUser] = useState(false)
  const dispatch = useDispatch()
  const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
  const { getEmployeesDetails } = useSelector((state: any) => state.CompanyReducer);
  const { goTo } = useNavigation()
  const [selectTagUser, setSelectTagUser] = useState([])
  const [selectReassignUser, setSelectReassignUser] = useState<any>('')

  useEffect(() => {
    getApiHandler()
    const params = { branch_id: selectedIssues.raised_by_company?.branch_id }
    dispatch(
      getEmployees({
        params,
        onSuccess: (response) => () => { },
        onFailure: () => () => { }
      })
    )
  }, [])

  const getApiHandler = () => {
    const params = { ticket_id: selectedIssues?.id }
    dispatch(
      getTicketsEvents({
        params,
        onSuccess: (response) => () => { },
        onFailure: () => () => { }
      })
    )
  }

  const onSelectedTagUser = (item: any) => {
    let updatedSelectedId: any = [...selectTagUser];
    if (selectTagUser?.length > 0) {
      const selectedItem = updatedSelectedId;
      const ifExist = selectedItem.some(
        (el: any) => el === item?.id
      );
      if (ifExist) {
        updatedSelectedId = selectedItem.filter(
          (filterItem: any) => filterItem !== item?.id
        );
      } else {
        updatedSelectedId = [...updatedSelectedId, item.id];
      }
    } else {
      updatedSelectedId = [item.id];
    }
    setSelectTagUser(updatedSelectedId);
  };

  function ProceedTagUser() {

    const params = { event_type: 'TGU', tagged_users: selectTagUser, id: selectedIssues?.id }

    dispatch(addTicketEvent({
      params,
      onSuccess: (response) => () => {
        getApiHandler()
        setOpenModalTagUser(!openModalTagUser)
      },
      onFailure: (failure) => () => { }
    }))
  }

  function ProceedReassignUser() {

    const params = { event_type: 'RGU', assigned_to: selectReassignUser.id, id: selectedIssues?.id }

    dispatch(addTicketEvent({
      params,
      onSuccess: () => () => { setOpenModalReassignUser(!openModalReassignUser) },
      onFailure: () => () => { }
    }))
  }

  return (
    <>
      <Tabs tabs={[{ id: '1', title: "THREAD", component: <>chat</> }, { id: '2', title: "ATTACH", component: <Attachments/> }, { id: '3', title: "reference", component: <ReferenceTickets/> }, { id: '4', title: "user", component: <IssueUsers/> }]} />

      <div className="d-flex justify-content-end">
        <DropDownMenuArrow
          onClickTagUser={() => { setOpenModalTagUser(!openModalTagUser) }}
          onClickReassignUser={() => { setOpenModalReassignUser(!openModalReassignUser) }}
          onClickAttachReference={() => { goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_REFERENCE_TICKET) }}
        />
      </div>
      <Modal size={'md'} fade={false} isOpen={openModalTagUser}
        onClose={() => {
          setOpenModalTagUser(!openModalTagUser)
        }}>
        {
          getEmployeesDetails && getEmployeesDetails.length > 0 && getEmployeesDetails.map((tagUser: any, index: number) => {
            const selected = selectTagUser.some(
              (selectUserEl: any) => selectUserEl === tagUser?.id
            );

            return (
              <>
                <div className="row">
                  <H
                    className="py-2 m-0 col-11 pointer"
                    tag={'h4'}
                    text={tagUser.name}
                    onClick={() => { (onSelectedTagUser(tagUser)) }}
                  />
                  {
                    selected &&
                    <span className="pt-2">
                      <Image className="bg-white" variant={'avatar'} size={'xs'} src={icons.tickGreen} />
                    </span>
                  }
                </div>
                <div className='mx--4'>{index !== getEmployeesDetails.length && <Divider space={'1'} />}</div>
              </>
            )
          })
        }
        <div className="pt-3 text-center">
          <Button
            text={translate("common.submit")}
            block
            onClick={() => { ProceedTagUser() }} />
        </div>
      </Modal>

      <Modal size={'md'} fade={false} isOpen={openModalReassignUser}
        onClose={() => {
          setOpenModalReassignUser(!openModalReassignUser)
        }}>
        {
          getEmployeesDetails && getEmployeesDetails.length > 0 && getEmployeesDetails.map((ReassignUser: any, index: number) => {
            const selected = selectReassignUser.id === ReassignUser.id
            return (
              <>
                <div className="row">
                  <H
                    className="col-11 py-2 m-0 pointer"
                    tag="h4"
                    text={ReassignUser.name}
                    onClick={() => { setSelectReassignUser(ReassignUser) }} />
                  {
                    selected &&
                    <span className="pt-2">
                      <Image className="bg-white" variant={'avatar'} size={'xs'} src={icons.tickGreen} />
                    </span>
                  }
                </div>
                <div className='mx--4'>{index !== getEmployeesDetails.length && <Divider space={'1'} />}</div>
              </>
            )
          })
        }
        <div className="pt-3 text-center">
          <Button
            text={translate("common.submit")}
            block
            onClick={() => { ProceedReassignUser() }} />
        </div>
      </Modal>
    </>
  )
}

export { IssueDetails }