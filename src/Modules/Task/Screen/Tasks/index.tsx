import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, getTaskItem, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading, Image, CommonTable, Priority, Status } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler, FILTERED_LIST, STATUS_LIST, PRIORITY_DROPDOWN_LIST, SEARCH_PAGE, getMomentObjFromServer, COMPANY_TYPE, getDisplayDateTimeFromMoment } from "@Utils";


function Tasks() {
  const { goTo } = useNavigation();
  const { tasks, taskNumOfPages, taskCurrentPages } = useSelector((state: any) => state.AdminReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTasks = useDropDown(FILTERED_LIST[0])
  const taskStatus = useDropDown(STATUS_LIST[0])
  const taskPriority = useDropDown(PRIORITY_DROPDOWN_LIST[0])
  const companyType = useDropDown(COMPANY_TYPE[0])
  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (!isSync.tasks) {
      getTaskHandler(taskCurrentPages)
    }
  }, [isSync])



  const getTaskHandler = (pageNumber: number) => {

    const params = {
      q: "",
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
        <div className="row m-0" style={{ width: "" }}> <Priority priority={el?.priority} /> <span className="ml-">{el?.title}</span></div>,
            "attachments":
          <div className="avatar-group " style={{
            width: '160px'
          }}>
            {
              el?.task_attachments &&
              el?.task_attachments.length > 0 && el?.task_attachments.map((item) => {
                return <a className="avatar avatar-md"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}>
                  <Image
                    variant={'avatar'}
                    src={getPhoto(item?.attachment_file)} />
                </a>
              })
            }

          </div>,
        "raised by":
          <div className="h5 m-0"> {el?.by_user?.name} </div>,
        "raised to":
          <div className="row">
            <div className="col-4 d-flex  justify-content-center "> <Image variant={'rounded'} src={getPhoto(el?.raised_by_company?.attachment_logo)} /> 
            </div>
            <div className="col-8  mb-0">
              <div className="h5 mb-0"> {el?.raised_by_company?.display_name} </div>
              <div className=""> @<span className="h5"> {el?.assigned_to?.name} </span></div>
              <div className=""></div>
              <div className="">{el?.raised_by_company?.place || "Gummidipoondi"}</div>
            </div>
          </div>,
        date: getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at)),
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
      {tasks && tasks.data.length > 0 ?
        <>

          <CommonTable
          heading={  <>
          <div className="row mt-3 mb--3">
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
                heading={'Priority'}
                data={PRIORITY_DROPDOWN_LIST}
                selected={taskPriority.value}
                value={taskPriority.value}
                onChange={(item) => {
                  taskPriority.onChange(item)
                  setSyncTickets()
                }}
              />
            </div>
            <div className="col-lg-4 col-md-3 col-sm-12">
              <DropDown
                heading={'Company'}
                data={COMPANY_TYPE}
                selected={companyType.value}
                value={companyType.value}
                onChange={(item) => {
                  companyType.onChange(item)
                  setSyncTickets()
                }}
              />
            </div>
          </div>
        </>}
            isPagination
            title="Tasks"
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
              // console.log('1111111111111', JSON.stringify(item));
              // dispatch(setSelectedReferenceIssues(undefined))
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.TASK_DETAILS + '/' + item?.id);
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