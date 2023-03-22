import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading, Image, CommonTable } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, getStatusFromCode, paginationHandler, FILTERED_LIST, STATUS_LIST, PRIORITY, getObjectFromArrayByKey, SEARCH_PAGE, COMPANY } from "@Utils";
import { setSelectedReferenceIssues, setSelectedIssues } from "@Redux";


function Tasks() {
  const { goTo } = useNavigation();
  const { dashboardDetails, } = useSelector((state: any) => state.AdminReducer);
  const { tasks,tasksNumOfPages,tasksCurrentPages } = useSelector((state: any) => state.AdminReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTasks = useDropDown(FILTERED_LIST[0])
  const taskStatus = useDropDown(STATUS_LIST[0])
  const taskPriorty = useDropDown({})
  const internal = useDropDown({})
  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (!isSync.tasks) {
      getTaskHandler(tasksCurrentPages)
    }
  }, [isSync])
  

  console.log("==========",tasks,tasksNumOfPages,tasksCurrentPages )

  const getTaskHandler = (pageNumber: number) => {

    const params = {
      q: "",
      q_many: search.value,
      // tickets_by: filteredTickets?.value.id,
      // ticket_status: ticketStatus?.value.id,
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

  function Priority({ priority }) {
    const color = getObjectFromArrayByKey(PRIORITY, 'id', priority).color
    return <div className="row mb-0 align-items-center">
      <div style={{
        height: 10, width: 10, borderRadius: 5, background: color
      }}>
      </div>
      <span className="ml-2">{getObjectFromArrayByKey(PRIORITY, 'id', priority).text}</span>
    </div>
  }

  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {
        issue: el?.title,
       attachments: <Image variant={'rounded'} src={getPhoto(el?.raised_by_company?.attachment_logo)} />,
        "raised by": el?.by_user?.name,
        "priority": <Priority priority={el?.priority} />,
        status: getStatusFromCode(dashboardDetails, el?.task_status),
        "assigned to": el?.assigned_to?.name,
        'phone': el?.raised_by_company?.phone,
        'email': el?.raised_by_company?.email,
        company: el?.raised_by_company?.display_name,
        address: el?.raised_by_company?.address
      };
    });
  };




  return (
    <>
      <HomeContainer isCard >
        <div className="row mt-3">
          <div className="col-lg-4  col-md-3 col-sm-12">
            <InputHeading heading={translate("common.taskName")} />
            <div className="input-group bg-white border">
              <input
                type="text"
                className="form-control bg-transparent border border-0"
                placeholder={translate("auth.search")!}
                value={search.value}
                onChange={search.onChange}
              />
              <span
                className="input-group-text  border border-0"
                onClick={proceedTaskSearch}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-search" />
              </span>
            </div>
          </div>


          <div className="col-lg-4 col-md-3 col-sm-12 ">
            <DropDown
              heading={translate("common.filterTasks")}
              selected={filteredTasks.value}
              data={FILTERED_LIST}
              value={filteredTasks.value}
              onChange={(item) => {
                filteredTasks.onChange(item)
                setSyncTickets()
              }}
            />
          </div>

          <div className="col-lg-4 col-md-3 col-sm-12">
            <DropDown
              heading={translate("common.taskStatus")}
              data={STATUS_LIST}
              selected={taskStatus.value}
              value={taskStatus.value}
              onChange={(item) => {
                console.log(item)
                taskStatus.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12">
            <DropDown
              heading={'Priorty'}
              data={PRIORITY}
              selected={taskPriorty.value}
              value={taskPriorty.value}
              onChange={(item) => {
                taskPriorty.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12">
            <DropDown
              heading={'Company'}
              data={COMPANY}
              selected={internal.value}
              value={internal.value}
              onChange={(item) => {
                internal.onChange(item)
                setSyncTickets()
              }}
            />
          </div>

          <div className="col text-right mt-5">
            <Button
              size={"sm"}
              text={'Add Task'}
              onClick={() => {
                goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_TASK);
              }}
            />
          </div>
        </div>
      </HomeContainer>


      {tasks && tasks.data.length > 0 ?
        <>

          <CommonTable
            isPagination
            title="Tasks"
            tableDataSet={tasks.data}
            displayDataSet={normalizedTableData(tasks.data)}
           noOfPage={tasksNumOfPages}
           currentPage={tasksCurrentPages}
            paginationNumberClick={(currentPage) => {
              getTaskHandler(paginationHandler("current", currentPage));
            }}
            previousClick={() => {
              getTaskHandler(paginationHandler("prev", tasksCurrentPages))
            }
            }
            nextClick={() => {
              getTaskHandler(paginationHandler("next", tasksCurrentPages));
            }
           }
            tableOnClick={(idx, index, item) => {
              dispatch(setSelectedIssues(item));
              dispatch(setSelectedReferenceIssues(undefined))
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_DETAILS);
            }
            }
          />
        </>
        : <NoDataFound/>
      }

    </>
  );
}

export { Tasks };