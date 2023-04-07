import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getTasks, getTaskItem, setIsSync, getSelectReferenceId, getAssociatedCompanyBranch, getSelectSubTaskId } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading, Image, CommonTable, Priority, Status, NoTaskFound } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler, FILTERED_LIST, STATUS_LIST, PRIORITY_DROPDOWN_LIST, SEARCH_PAGE, getMomentObjFromServer, COMPANY_TYPE, getDisplayDateTimeFromMoment } from "@Utils";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { icons } from "@Assets";

function Tasks() {
  const { goTo } = useNavigation();
  const { tasks, taskNumOfPages, taskCurrentPages } = useSelector((state: any) => state.AdminReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTasks = useDropDown(FILTERED_LIST[2])
  const taskStatus = useDropDown(STATUS_LIST[2])
  const taskPriority = useDropDown(PRIORITY_DROPDOWN_LIST[0])
  const companyType = useDropDown(COMPANY_TYPE[0])
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
  const [basicTag, setBasicTag] = useState(true)
  const [advanceTag, setAdvanceTag] = useState(false)

  const getCompanyBranchDropdown = (details: any) => {

    let companies: any = [];
    companies.push({ id: '', text: "Self" })

    if (details && details.length > 0) {
      details.forEach(({ id, display_name }) => {
        companies = [
          ...companies,
          { id: id, text: display_name, name: display_name },
        ];
      });
      setModifiedCompanyDropDownData(companies);
    }
  };

  useEffect(() => {
    const params = { q: "" };
    dispatch(
      getAssociatedCompanyBranch({
        params,
        onSuccess: (response: any) => () => {
          dispatch(
            setIsSync({
              ...isSync,
              companies: false,
            })
          );
          getCompanyBranchDropdown(response.details);

        },
        onError: () => () => {

        },
      })
    );
  }, []);

  useEffect(() => {
    if (!isSync.tasks) {
      getTaskHandler(taskCurrentPages)
    }
  }, [isSync])


  const getTaskHandler = (pageNumber: number) => {

    const params = {
      q_many: search.value,
      tasks_by: filteredTasks?.value.id,
      task_status: taskStatus?.value.id,
      company: companyType.value.id,
      priority: taskPriority.value.id,
      page_number: pageNumber
    };
    dispatch(
      getTasks({
        params,
        onSuccess: () => () => {
          setSyncTickets(true)
        },
        onError: () => () => { },
      })
    );
  };


  function setSyncTickets(sync = false) {
    dispatch(
      setIsSync({
        ...isSync,
        tasks: sync,
      })
    );
  }

  function proceedTaskSearch() {
    setSyncTickets()
    getTaskHandler(SEARCH_PAGE)
  }

  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {
        "task":
          <div className="row"> <Priority priority={el?.priority} /> <span className="col">{el?.title}</span></div>,
        "attachments":
          <div className="avatar-group" style={{
            width: '87px'
          }}>
            {
              el?.task_attachments &&
              el?.task_attachments.length > 0 && el?.task_attachments.map((item) => {
                return <a className="avatar avatar-md"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}>
                  <Image
                    variant={'rounded'}
                    size={'xs'}
                    src={getPhoto(item?.attachment_file)} />
                </a>
              })
            }

          </div>,
        "raised by":
          <div className="h5 m-0"> {el?.by_user?.name} </div>,
        "raised to":
          <>
            <div className="row">
              <div className="col-3 p-0 align-self-center">
                <div className="col p-0 d-flex justify-content-center"> {el.raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(el.raised_by_company?.attachment_logo)} />} </div>
              </div>

              <div className="col-9 text-truncate">
                <h6>
                  <div className="h5 mb-0"> {el?.raised_by_company?.display_name}</div>
                  <div className="h5 mb-0 d-inline-block text-truncate">@<span className="h5"> {el?.assigned_to?.name} </span></div>
                  <div className={'text-uppercase mb-0  text-muted'}>{el?.raised_by_company?.place || "Gummidipoondi"}</div>
                </h6>
              </div>
              <div className="col"></div>
            </div>

          </>,
        'Assigned At': <div>{getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at))}</div>,
        status: <Status status={el?.task_status} />
      };
    });
  };

  return (
    <>
      <HomeContainer>
        <div className="text-right">
          <Button
            size={"sm"}
            text={translate('common.createTask')}
            onClick={() => {
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_TASK);
            }}
          />
        </div>


      </HomeContainer>
      <HomeContainer isCard className={'mb--5'} >
        <div className="row mb--3">
          <h3 className={'col-11'}>Tasks</h3>
          <div className="pl-4">
            <UncontrolledDropdown>
              <DropdownToggle
                color=""
                size="sm"
                className="text-light"
              >
                <Image src={icons.Equalizer} className="bg-white" variant={'avatar'} size={'xs'} />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  href="#pablo"
                  onClick={() => {

                    setBasicTag(true)
                    setAdvanceTag(false)
                  }

                  }
                >
                  <div className={basicTag ? 'text-primary' : 'text-black'}>
                    {translate('auth.basic')}
                  </div>
                </DropdownItem>

                <DropdownItem
                  href="#pablo"
                  onClick={() => {
                    setAdvanceTag(true)
                    setBasicTag(false)
                  }
                  }
                >
                  <div className={advanceTag ? 'text-primary' : 'text-black'}>
                    {translate('auth.advance')}
                  </div>
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>


        <div className="row mt-3 mb--3">
          <div className="col-lg-3  col-md-3 col-sm-12">
            <InputHeading heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.codeTitle")}</h4>} />
            <div className="input-group bg-white border">
              <input
                type="text"
                className="form-control bg-transparent border border-0  form-control-sm"
                placeholder={translate("auth.search")!}
                value={search.value}
                onChange={search.onChange}
              />
              <span
                className="input-group-text pointer border border-0"
                onClick={proceedTaskSearch}
              >
                <i className="fas fa-search" />
              </span>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 ">
            <DropDown
              className="form-control-sm"
              heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.assignedTo")}</h4>}
              selected={filteredTasks.value}
              data={FILTERED_LIST}
              value={filteredTasks.value}
              onChange={(item) => {
                filteredTasks.onChange(item)
                setSyncTickets()
              }}
            />
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12">
            <DropDown
              className="form-control-sm"
              heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.ticketStatus")}</h4>}
              data={STATUS_LIST}
              selected={taskStatus.value}
              value={taskStatus.value}
              onChange={(item) => {
                taskStatus.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <DropDown
              className="form-control-sm"
              heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.Priority")}</h4>}
              data={PRIORITY_DROPDOWN_LIST}
              selected={taskPriority.value}
              value={taskPriority.value}
              onChange={(item) => {
                taskPriority.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
          {advanceTag &&
            <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
              <DropDown
                className="form-control-sm"
                heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.company")}</h4>}
                data={modifiedCompanyDropDownData}
                selected={companyType.value}
                value={companyType.value}
                onChange={(item) => {
                  companyType.onChange(item)
                  setSyncTickets()
                }}
              />
            </div>
          }
        </div>

      </HomeContainer>
      {tasks && tasks.data.length > 0 ?
        <>
          <CommonTable
            isPagination
            tableDataSet={tasks.data}
            displayDataSet={normalizedTableData(tasks.data)}
            noOfPage={taskNumOfPages}
            currentPage={taskCurrentPages}
            paginationNumberClick={(currentPage) => {
              getTaskHandler(paginationHandler("current", currentPage));
            }}
            previousClick={() => {
              getTaskHandler(paginationHandler("prev", taskCurrentPages))
            }
            }
            nextClick={() => {
              getTaskHandler(paginationHandler("next", taskCurrentPages));
            }
            }
            tableOnClick={(idx, index, item) => {
              dispatch(getTaskItem(item));
              dispatch(getSelectReferenceId(undefined))
              dispatch(getSelectSubTaskId(undefined))
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.TASK_DETAILS + '/' + item?.id);
            }
            }
          />
        </>

        : 
        <div ><NoTaskFound/>
         <div className="text-center">
    <Button
            size={"md"}
            text={translate('common.createTask')}
            onClick={() => {
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_TASK);
            }}
          />
          </div>  

        </div>
      }

    </>
  );
}

export { Tasks };