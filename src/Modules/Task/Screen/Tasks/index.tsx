import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, getTaskItem, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading, Image, CommonTable, Priority, Status } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler, FILTERED_LIST, STATUS_LIST, PRIORITY, SEARCH_PAGE, getDataAndTime, getMomentObjFromServer, COMPANY, getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getServerTimeFromMoment } from "@Utils";


function Tasks() {
  const { goTo } = useNavigation();
  const { tasks, tasksNumOfPages, tasksCurrentPages } = useSelector((state: any) => state.AdminReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTasks = useDropDown(FILTERED_LIST[0])
  const taskStatus = useDropDown(STATUS_LIST[0])
  const taskPriorty = useDropDown({})
  const company = useDropDown({})
  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (!isSync.tasks) {
      getTaskHandler(tasksCurrentPages)
    }
  }, [isSync])



  const getTaskHandler = (pageNumber: number) => {

    const params = {
      q: "",
      q_many: search.value,
      tasks_by: filteredTasks?.value.id,
      task_status: taskStatus?.value.id,
      company: company.value.id ? company.value.id : 'ALL',
      priority: taskPriorty.value.id ? taskPriorty.value.id : "ALL",
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
        "task": <div className="row m-0" style={{ width: "230px" }}> <Priority priority={el?.priority} /> <span className="ml-2">{el?.title}</span></div>,
        "task attachments":
          <div className="avatar-group m-0" style={{
            width: '100px'
          }}>
            {
              el?.task_attachments &&
              el?.task_attachments.length > 0 && el?.task_attachments.map((item) => {
                return <a className="avatar avatar-md rounded-circle"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}>
                  <Image
                    variant={'rounded'}
                    src={getPhoto(item?.attachment_file)} />
                </a>
              })
            }

          </div>,
        "raised by": <div className="m-0" style={{ width: "" }}>
          <div className="h5 m-0"> {el?.by_user?.name} </div>
        </div>,
        "raised to": <div className=" m-0" style={{ width: "250px" }}>
          <div className="mb-2"> <Image variant={'avatar'} src={getPhoto(el?.raised_by_company?.attachment_logo)} /> </div>
          <div className="h5 m-0"> {el?.raised_by_company?.display_name}</div>
          <div className=" m-0 "> Assigned to: @ <span className="h5"> {el?.assigned_to?.name} </span> </div>
          <div> {el?.raised_by_company?.address} </div>
        </div>,
        date: getServerTimeFromMoment(getMomentObjFromServer(el.created_at)),
        status: <Status status={el?.task_status} />
      };
    });
  };

  return (
    <>
      <HomeContainer isCard className={'mb--3'}>
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
              selected={company.value}
              value={company.value}
              onChange={(item) => {
                company.onChange(item)
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
              dispatch(getTaskItem(item));
              // dispatch(setSelectedReferenceIssues(undefined))
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.TASK_DETAILS);
            }
            }
          />
        </>
        : <NoDataFound />
      }

    </>
  );
}

export { Tasks };