import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskEvent, getTaskEvents } from "@Redux";
import { Card, Image, Input, Modal, Dropzone, Button } from "@Components";
import { icons } from '@Assets'
import { TEM, MEA, arrayOrderbyCreatedAt } from "@Utils";
import { useInput } from "@Hooks";
import { TaskChat } from "@Modules";


function Comments() {
  const dispatch = useDispatch();
  const { taskEvents } = useSelector((state: any) => state.CompanyReducer);
  const { taskItem } = useSelector((state: any) => state.AdminReducer);
  const textMessage = useInput('')
  const [selectAttachments, setSelectAttachments] = useState(false)
  const modalName = useInput('')
  const [selectDropzone, setSelectDropzone] = useState<any>([{}])
  const [photo, setPhoto] = useState<any>([])
  const [image, setImage] = useState('')


  useEffect(() => {
    ProceedGetTaskEvents()
  }, [])


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
        id: taskItem.id,
        message: textMessage.value,
        event_type: TEM
      }

      dispatch(addTaskEvent({
        params,
        onSuccess: (response) => () => {
          textMessage.set('')
          ProceedGetTaskEvents()
        },
        onFailure: (error) => () => { }
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
        },
        onError: (error) => () => { },
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

  return (
    <>

      <Card className="container overflow-auto overflow-hide mb--1" style={{ height: '89vh' }}>
        <div className="row">
          <div className="col">
            <div>
              {getTaskEventData && getTaskEventData.length > 0 && getTaskEventData.map((el) => {

                return (
                  <div className={''}><TaskChat item={el} /></div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="row fixed-bottom position-absolute mx-xl-9 mx-md-9 mx-sm-9" style={{zIndex:"unset"}}>
          <div className="col">
            <div className={'py-2'}>
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
          </div>
          <div className="col-10">
            <Input className={'rounded-pill'} type='text' value={textMessage.value} placeholder={'Type a message'} onChange={textMessage.onChange} />
          </div>
          <div className="col">
            <span className={'icon icon-shape text-white bg-info rounded-circle shadow'} onClick={sendMessageHandler}><i className="ni ni-send"></i></span>
          </div>
        </div>
      </Card>
    </>
  );
}

export { Comments };