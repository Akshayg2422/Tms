import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskEvent, getSubTasks, getTaskEvents, setIsSync } from "@Redux";
import { NoDataFound, Card, Image, CommonTable, Priority, Input, Modal, Dropzone, Button } from "@Components";
import { icons } from '@Assets'
import { TEM, MEA, arrayOrderbyCreatedAt, getPhoto } from "@Utils";
import { CardBody, CardHeader } from "reactstrap";
import { useInput } from "@Hooks";
import { TaskChat } from "@Modules";


function Comments() {
  const dispatch = useDispatch();
  const { taskEvents, addTaskEvents } = useSelector((state: any) => state.CompanyReducer);
  const { subTasks, taskItem } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const textMessage = useInput('')
  const [selectAttachments, setSelectAttachments] = useState(false)
  const modalName = useInput('')
  const [selectDropzone, setSelectDropzone] = useState<any>([{}])
  const [photo, setPhoto] = useState<any>([])
  const [image, setImage] = useState('')


  useEffect(() => {
    ProceedGetTaskEvents()
    getSubTaskHandler()
  }, [])

  const getSubTaskHandler = () => {
    const params = {
      task_id: taskItem?.id
    }

    dispatch(
      getSubTasks({
        params,
        onSuccess: (response) => () => {

          // setSyncTickets(true)
        },
        onError: () => () => { },
      })
    );
  };

  const ProceedGetTaskEvents = () => {
    const params = {
      task_id: taskItem?.id
    }

    dispatch(
      getTaskEvents({
        params,
        onSuccess: (response) => () => { },
        onError: () => () => { },
      })
    );
  };

  const sendMessageHandler = () => {

    if (textMessage) {
      const params = {
        task_id: taskItem.id,
        message: textMessage.value,
        event_type: TEM
      }

      dispatch(addTaskEvent({
        params,
        onSuccess: (response) => () => {
          textMessage.set('')
          ProceedGetTaskEvents()
          console.log('addTaskEventSuccessssMessage', response);

        },
        onFailure: (error) => () => {
          console.log('error message', error);

        }
      }))
    }
  }

  const onModalSubmitHandler = () => {
    const params = {
      event_type: MEA,
      id: taskItem.id,
      attachments: [{ attachment: photo }],
      name: modalName.value
    };
    dispatch(
      addTaskEvent({
        params,
        onSuccess: (response) => () => {
          ProceedGetTaskEvents();
          console.log('modalresponse', response);

        },
        onError: (error) => () => {
          console.log('modalerror', error);

        },
      }),
    );
    setSelectAttachments(!selectAttachments);
    resetValues();
  };
  const resetValues = () => {
    modalName.set('');
    setSelectDropzone([{}]);
  };

  const handleImagePicker = (index: number, file: any) => {
    let updatedPhoto = [...selectDropzone, file]
    let newUpdatedPhoto = [...photo, file]
    setSelectDropzone(updatedPhoto)
    setPhoto(newUpdatedPhoto)
  }

  let getTaskEventData = arrayOrderbyCreatedAt(taskEvents?.data)

  const normalizedTableData = (data: any) => {

    return data.map((el: any) => {

      return {
        "Sub task": <div className="row m-0 overflow-auto overflow-hide"> <Priority priority={el?.priority} /> <span className="ml-2">{el?.title}</span></div>,
      };
    });
  };
  console.log('getTaskEventData==========>', JSON.stringify(getTaskEventData));

  return (
    <>

      <div className="d-flex">
        <div className={'col-xl-8'}>
          <Card className='mx--3 overflow-auto overflow-hide' style={{ height: '80vh' }}>

            <div className="row d-flex align-items-end" style={{ height: '80vh' }}>
              <div className='col-1' style={{ zIndex: 6 }}>
                <Image variant='rounded' size='sm' src={icons.addFillSquare} onClick={() => { setSelectAttachments(!selectAttachments) }} />
              </div>
              <div>
                <Modal isOpen={selectAttachments}
                  onClose={() => {
                    setSelectAttachments(!selectAttachments)
                  }}>
                  <Input className='rounded-pill' heading={'Name'} value={modalName.value} onChange={modalName.onChange} />
                  {selectDropzone && selectDropzone.map((el, index) => {
                    return (
                      <Dropzone variant='ICON'
                        icon={image}
                        size='xl'
                        onSelect={(image) => {
                          let file = image.toString().replace(/^data:(.*,)?/, '');
                          handleImagePicker(index, file)
                        }}
                      />
                    )
                  })}
                  <div className='d-flex flex-row pt-4'>
                    <Button text={'Submit'} className={'rounded-pill px-5'} onClick={() => onModalSubmitHandler()} />
                  </div>
                </Modal>
              </div>
              <div className="col-9">
                <Input className={'rounded-pill'} type='text' value={textMessage.value} placeholder={'Type Here'} onChange={textMessage.onChange} />
              </div>
              <div className="col-2">
                <span className={'icon icon-shape text-white bg-info rounded-circle shadow'} onClick={sendMessageHandler}><i className="ni ni-send"></i></span>
              </div>
            </div>
            <div className={'py-5'}>
              {getTaskEventData && getTaskEventData.length > 0 && getTaskEventData.map((el) => {
                console.log('map====>', el);

                return (
                  <TaskChat item={el} />

                )
              })}
            </div>
          </Card>
        </div>
        <div className={'col-xl-4'}>
          {subTasks && subTasks.data.length > 0 ?
            <Card className={'mx--3 overflow-auto overflow-hide shadow-none'} style={{ height: '80vh' }}>
              <div className={'mx--5'}>
                <CommonTable
                  title="SUB TASKS"
                  tableDataSet={subTasks?.data}
                  displayDataSet={normalizedTableData(subTasks?.data)}
                />
              </div>
            </Card>
            : <NoDataFound />
          }
        </div>
      </div>
    </>
  );
}

export { Comments };