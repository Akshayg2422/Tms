import React from 'react'
import { Back, Button, Card, CommonTable, DragAndReorder, Modal, NoRecordsFound } from '@Components'
import { fetchCourseTopicTasks, fetchTaskDetails, handleDndModal, postGenericBatchCrudDetails, postGenericCrudDetails, settingCurrentTaskItem } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from '@Routes';
import { useLoader, useNavigation } from '@Hooks';
import { translate } from '@I18n'
import { DropDownMenuArrow } from '@Modules';
import { showToast } from '@Utils';

function AdminTopicSection() {

  const dispatch = useDispatch();
  const { goTo } = useNavigation()

  const { courseTopicTasks, courseTopicName } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [deleteModal, setDeleteModal] = useState(false)
  const [currentDeleteItem, setCurrentDeleteItem] = useState<any>()
  const taskLoader = useLoader(false)

  console.log("courseTopicTasks--->", courseTopicName);


  useEffect(() => {

    const params = {
      topic_id: courseTopicName?.id
    }
    taskLoader.showLoader()
    dispatch(fetchCourseTopicTasks({
      params,
      onSuccess: (success: any) => {
        taskLoader.hideLoader()
      },
      onError: (error: string) => {
        taskLoader.hideLoader()
      }
    }))
  }, [])

  const handleDndSubmit = (subTopic: any) => {

    const params = {
      mq: "course__Task",
      data: subTopic
    }
    dispatch(postGenericBatchCrudDetails({
      params,
      onSuccess: (success: any) => {
        showToast('success', success.message)
        const params = {
          topic_id: courseTopicName?.id
        }
        dispatch(fetchCourseTopicTasks({ params }))
        dispatch(handleDndModal(true))
      },
      onError: (error: string) => {
        dispatch(handleDndModal(true))
      }
    }))
  }

  const onDeleteHandler = (item) => {

    const params = {
      mq: "course__Task",
      data: { id: item.id },
      force_delete: true
    }

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => {
        showToast('success', success.message)
        setDeleteModal(!deleteModal)
        const params = {
          topic_id: courseTopicName?.id
        }

        dispatch(fetchCourseTopicTasks({ params }))
      },
      onError: (error: string) => {
      },
    }))
  }

  const editItem = (item) => {

    const params = {
      task_id: item.id
    }

    dispatch(fetchTaskDetails({ params }))
  }


  const normalizedTaskData = (data: any) => {
    return data.map((el: any) => {
      return {
        concept: el.name,
        mandatory: <span className={`text-${el.is_manditory === true ? 'success' : 'danger'} mr-1`}>         ●</span>,
        Action:
          <>
            <DropDownMenuArrow
              onDeleteClick={() => {
                setCurrentDeleteItem(el)
                setDeleteModal(!deleteModal)
              }}
              onAddClick={() => {
                manageTaskHaandler(el)
              }}
            />
          </>
        // "Status": <Button size="sm" text={"Start"} onClick={() => goTo('/dashboard' + ROUTES.HOME.LANDING)} />,      

      };
    });
  };

  const manageTaskHaandler = (currentItem) => {
    console.log("currentItemcurrentItem",currentItem);
    
    currentItem ? dispatch(settingCurrentTaskItem(currentItem)) : dispatch(settingCurrentTaskItem(undefined))
    goTo('/dashboard' + ROUTES.HOME.QUESTION_CREATION)
  }



  return (
    <>
      <div className='container-fluid p-2'>
        <div className='pb-2'>  <Back text={courseTopicName?.name} /></div>


        <Card className='overflow-auto scroll-hidden mt-0 ' style={{ height: '85.4vh' }}>

          <div className="row pt-1" >
            <div className='col text-right pr-4'>
              <DragAndReorder
                title={translate('course.topicSection')!}
                dndData={courseTopicTasks?.data}
                onSubmitClick={(data) => handleDndSubmit(data)}
              />

              {/* <div className="col-sm-2 text-right"> */}
              <Button
                // className="btn float-right mr--4"
                color="primary"
                onClick={() => manageTaskHaandler(undefined)}
                size="sm"
                text={translate('course.add')}
              />
            </div>
            {/* </div> */}
          </div>
          {courseTopicTasks && courseTopicTasks?.data?.length > 0 ?
            <div className=" overflow-auto " style={{ marginLeft: '-39px', marginRight: '-39px' }}>
              <CommonTable displayDataSet={normalizedTaskData(courseTopicTasks.data)}
                isLoading={taskLoader.loader}
              />
            </div>
            :
            <div className=" d-flex justify-content-center align-items-center" style={{
              height: "73.2vh"
            }}>
              <NoRecordsFound />
            </div>
          }
        </Card>
      </div>

      <Modal isOpen={deleteModal} onClose={() => { setDeleteModal(!deleteModal) }} title={`Do you want to delete the selected task ?`} titleClassname={'text-muted fw-light'}>
        <div className="mt--4 ml--1">
          <h2>{currentDeleteItem?.name}</h2>
        </div>

        <div className='text-right'>
          <Button
            color={'secondary'}
            text={translate('common.cancel')}
            onClick={() => { setDeleteModal(!deleteModal) }}
          />
          <Button

            text={'Proceed'}
            onClick={() => {
              onDeleteHandler(currentDeleteItem)
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export { AdminTopicSection }