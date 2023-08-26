import { icons } from "@Assets";
import { Button, CommonTable, HomeContainer, Image, ImageColor, ImageIcon, MicroPhoneModal, Modal, NoDataFound, Priority, Spinner, Status } from "@Components";
import { useModal, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { TaskFilters, TaskGroups } from '@Modules';
import {  getTasks,  setSelectedTabPosition, setSelectedTask, setTaskParams, setSelectedModal,  setSelectedTaskstatus } from '@Redux';
import { ROUTES } from '@Routes';
import { capitalizeFirstLetter, getDates, getPhoto, paginationHandler } from '@Utils';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function Tasks() {
  const dispatch = useDispatch()
  const { tasks, taskNumOfPages, taskCurrentPages, taskParams, selectedMicroModal} = useSelector((state: any) => state.TaskReducer);
  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { company } = dashboardDetails || ''
  const { goTo } = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTaskHandler(taskCurrentPages)
  }, [taskParams])
  useEffect(() => {
    dispatch(
      setSelectedModal(false)
    )

  }, [])

  const getTaskHandler = (page_number: number) => {

    setLoading(true);
    const updatedParams = { ...taskParams, page_number }
    dispatch(
      getTasks({
        params: updatedParams,
        onSuccess: () => () => {
          setLoading(false);
        },
        onError: () => () => {
          setLoading(false);

        },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    if (data && data?.length > 0)
      return data?.map((el: any) => {
        const { priority, parent, task_attachments, by_user, raised_by_company, task_status, eta_time, title, assigned_to, description } = el
        return {
          "task":
            <>
              <div className="row">
                <div className="d-flex ">


                  <div className="col-auto ">

                    <div className="mr--3"><Priority priority={priority} /></div>


                  </div>
                  <div className="col-auto ml--3 ">
                    <span>{capitalizeFirstLetter(title)}</span>
                    <div className=" text-primary  ">
                      {parent && parent?.name && <div>{parent?.name}
                      </div>
                      }
                    </div>
                  </div>
                </div>

                <div>

                </div>
              </div>
            </>,
          'description': <><div className="col-11" >
            {capitalizeFirstLetter(description)}

          </div>
          </>,

          '':
            <div className="row avatar-group">

              {
                task_attachments &&
                task_attachments.length > 0 && task_attachments.map((item) => {
                  return (
                    <div className="row">

                      <Image
                        variant={'avatar'}
                        src={getPhoto(item?.attachment_file)}
                        className="row"
                        
                      />


                    </div>
                  )
                })
              }


            </div >,
          "raised by":
            <div className="h5 row pl-1"> {by_user?.name} </div>,
          "Assigned To":
            <div className="row">
              {assigned_to ?
                <>
                  {company?.name === raised_by_company?.display_name ? '' : raised_by_company?.attachment_logo &&
                    <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} size={"sm"} />
                  }

                  <div className={"ml-2"}>
                    <div className={"h5 mb-0"}> {company?.name === raised_by_company?.display_name ? '' : raised_by_company?.display_name}</div>
                    <div className={`h5 mb-0 text-truncate ${company?.name === raised_by_company?.display_name ? 'mt--3' : ""} `}> @<span className="h5"> {capitalizeFirstLetter(assigned_to?.name)} </span></div>
                    <small className={'text-uppercase mb-0  text-muted'}>
                      {raised_by_company?.place}
                    </small>
                  </div>


                </>
                : <div className={'text-center'}>-</div>
              }
            </div >,

          status:
            <>
              <div className="d-flex">

                <div className="col-auto"><Status status={task_status} />
                </div>


                <div className="col">

                </div>

              </div>
              <div className="pl-3 ">
                <small style={{ fontSize: '9px' }}>{getDates() > getDates(eta_time) ? 'ABOVE ETA' : ""}</small>
              </div>
            </>
        };
      });
  };

  return (
    <div className="mx-3 mt-3">
      <div className="d-flex justify-content-end mr-2">
        <Button
          className="text-white"
          size={'sm'}
          text={translate("common.createTask")}
          onClick={() => {
            goTo(ROUTES["task-module"]["add-task"])
          }}
        />
        <div
        >
          {/* <ImageIcon src={icons.microPhone} height={25} width={25} onClick={() => {

            dispatch(
              setSelectedModal(true)
            )
          }} /> */}

        </div>

      </div>


      <div className="row mt-3 mx-2 mb-2">
        <div className="col">
          <TaskGroups
            onClick={(code) => {
              dispatch(setTaskParams({ ...taskParams, group: code }))
            }}
          />
        </div>
      </div>
      <HomeContainer type={'card'}>
        <div className="mx-4 mt-4 mb-2">
          <TaskFilters />
        </div>
        {loading && (
          <div className="d-flex align-items-center justify-content-center pointer" style={{ minHeight: '200px' }}>
            <Spinner />
          </div>
        )}

        {!loading &&
          <div >
            {tasks && tasks.length > 0 ?
              <CommonTable
                isPagination
                tableDataSet={tasks}
                displayDataSet={normalizedTableData(tasks)}
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
                  dispatch(setSelectedTask(item?.code));
                  dispatch(setSelectedTaskstatus([item]))
                  dispatch(setSelectedTabPosition({ id: '1' }))
                  goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.code + '/' + 'task');
                }
                }

              />

              :
              <div className="mb-3">
                <NoDataFound type={'action'} buttonText={translate("common.createTask")!} onClick={() => { goTo(ROUTES["task-module"]["add-task"]) }} isButton />
              </div>
            }
          </div>}

        {/* {selectedMicroModal && <MicroPhoneModal />} */}




      </HomeContainer>

    </div>

  );
}

export { Tasks };
