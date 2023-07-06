import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeContainer, NoDataFound, Spinner } from "@Components";
import { TaskGroups, TaskFilter } from '@Modules'
import { CommonTable, Image, Priority, Status } from '@Components'
import { paginationHandler, getPhoto, getDisplayDateTimeFromMoment, getMomentObjFromServer, capitalizeFirstLetter,getDates  } from '@Utils'
import { getTasks, setSelectedTask } from '@Redux'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { translate } from "@I18n";


function CompanyTasks() {

  const dispatch = useDispatch()
  const { tasks, taskNumOfPages, taskCurrentPages } = useSelector((state: any) => state.TaskReducer);
  const { selectedCompany,dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { company } = dashboardDetails || ''

  console.log(selectedCompany.branch_id ,"selectedCompany.branch_id ====>")

  const date = new Date();
  const time = date.getHours()

  const { goTo } = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTaskHandler(taskCurrentPages)
  }, [])

  const getTaskHandler = (page_number: number) => {
    const updatedParams = { page_number,
       branch_id: selectedCompany.branch_id }
       setLoading(true);

    dispatch(
      getTasks({
        params: updatedParams,
        onSuccess: (response) => () => {
          setLoading(false);

          console.log(JSON.stringify(response) + '=====');

        },
        onError: () => () => { 
          setLoading(false);
        },
      })
    );
  };


  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((el: any) => {
        // const etaDate = new Date(el.eta_time)
        // let etaTime = etaDate.getHours()
        const { priority, parent, task_attachments, by_user, raised_by_company, created_at, task_status, eta_time, title, assigned_to, description } = el

        return {
          "task":
            <>
              <div className="row">
                <Priority priority={priority} />
                <div>
                  <span>{capitalizeFirstLetter(title)}</span>
                  <div className="pt-1">
                    {parent && parent?.name && <div>{parent?.name}
                    </div>
                    }
                  </div>
                </div>
              </div>
            </>,
          'description': <div>
            {description}

          </div>,

          '':
            <div className="row avatar-group">
              {
                task_attachments &&
                task_attachments.length > 0 && task_attachments.map((item) => {
                  return (
                    <Image
                      variant={'avatar'}
                      src={getPhoto(item?.attachment_file)}
                    />
                  )
                })
              }

            </div >,
          "raised by":
            <div className="h5 m-0"> {by_user?.name} </div>,
          "Assigned To":
            <div className="row">
              {assigned_to ?
                <>
                  {company?.name === raised_by_company?.display_name ? '' : raised_by_company?.attachment_logo &&
                    <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />
                  }
                  <div className="ml-2">
                    <div className="h5 mb-0"> {company?.name === raised_by_company?.display_name ? '' : raised_by_company?.display_name}</div>
                    <div className={`h5 mb-0 text-truncate ${company?.name === raised_by_company?.display_name ? 'mt--3' : ""} `}>@<span className="h5"> {assigned_to?.name} </span></div>
                    <small className={'text-uppercase mb-0  text-muted'}>
                      {raised_by_company?.place}
                    </small>
                  </div>
                </> : <div></div>
              }
            </div >,
          // 'Assigned At': <div>{getDisplayDateTimeFromMoment(getMomentObjFromServer(created_at))}</div>,
          status: <div><Status status={task_status} />
            <small>{getDates() > getDates(eta_time) ? 'ABOVE ETA' : ""}</small>
          </div>
        };
      });
  };

  return (
    <HomeContainer type={'card'} className="mt-3 100-vh">
          {loading && (
          <div className="d-flex align-items-center justify-content-center pointer" style={{ minHeight: '100px' }}>
            <Spinner />
          </div>
        )}

{!loading && <div style={{ marginLeft: "-23px", marginRight: "-23px" }}>
      { tasks && tasks.length > 0 ?
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
       
        />
        : <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}><NoDataFound text={translate("auth.noTaskFound")!} /></div>
      }
      </div>}
    </HomeContainer>
  );
}

export { CompanyTasks };