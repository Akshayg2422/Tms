import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Card, NoDataFound, Spinner, Image, Modal, MenuBar, showToast, Checkbox, DateTimePicker, Input, Dropzone, MultiSelectDropDown, ImagePicker, TextAreaInput } from "@Components";
import { useInput, useLoader, useModal, useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { CarouselImages, EventItem } from "@Modules";
import { addEvent, getAssociatedCompanyBranch, getEvents, refreshEventsMessage } from "@Redux";
import { ADD_EVENT_EXTERNAL_RULES, ADD_EVENT_INTERNAL_RULES, INITIAL_PAGE, getArrayFromArrayOfObject, getDisplayTimeDateMonthYearTime, getMomentObjFromServer, getPhoto, getServerTimeFromMoment, getValidateError, ifObjectExist, validate, } from '@Utils'
import { icons } from "@Assets";
// import { Place_DD_MM_YY_Time } from "../../Place_DD_MM_YY_Time";


function Events() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  const { events, eventsCurrentPages } = useSelector(
    (state: any) => state.UserCompanyReducer
  );

  const MY_EVENT_MENU = [
    {
      id: 0, name: translate('common.Edit'), icon: icons.edit,
    },
    {
      id: 1, name: translate('common.delete'), icon: icons.deleteCurve,
    },
    {
      id: 2, name: translate('common.Mark as closed'),icon: icons.markAsOpen
    },

  ]

  const { goBack } = useNavigation();
  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
  const [photo, setPhoto] = useState<any>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<any>([]);
  const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState<any>("")
  const [endTime, setEndTime] = useState<any>("")
  const eventTitle = useInput("");
  const eventDescription = useInput("");
  const eventPlace = useInput("")
  const [internalCheck, setInternalCheck] = useState(true)
  const [externalCheck, setExternalCheck] = useState(false)
  const [isExternalDisable, setExternalDisable] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(undefined)
  const deleteEventModal = useModal(false)
  const editEventModal = useModal(false)
  const MarkAsClosedEventModal = useModal(false)
  const [isSelected, setIsSelected] = useState<boolean>(false)
const loginLoader=useLoader(false)

  useEffect(() => {
    
    getEventsApiHandler(INITIAL_PAGE)
  }, []);
  
  let AttachmentEdit = selectDropzone && selectDropzone.map((el, index) => {
    const { id, attachment_file } = el
    
    return {
      id: index + 1, photo: attachment_file,
    }

  })

  const getEventsApiHandler = (page_number: number) => {
    setLoading(true)
    const params = { page_number }
    dispatch(
      getEvents({
        params,
        onSuccess: (response) => () => {
          setLoading(false)
        },
        onError: () => () => {
          setLoading(false)
        },
      })
    )
  }

  useEffect(() => {
    const params = { q: "" };
    dispatch(
      getAssociatedCompanyBranch({
        params,
        onSuccess: (response: any) => () => {
          getCompanyBranchDropdown(response.details);
        },
        onError: () => () => {

        },
      })
    );
  }, []);

  const getCompanyBranchDropdown = (details: any) => {
    let companies: any = [];

    if (details && details.length > 0) {
      details.forEach(({ id, display_name }) => {
        companies = [
          ...companies,
          { key: id, value: display_name, name: display_name },
        ];
      });
      setModifiedCompanyDropDownData(companies);
      setExternalDisable(false)

    } else {
      setExternalDisable(true)
    }

  }


  const handleStartTimeEtaChange = (value: any) => {
    setStartTime(value)
  };

  const handleEndTimeEtaChange = (value: any) => {
    setEndTime(value)
  };

  const submitAddEventHandler = () => {

    const params = {
      id: selectedEvent?.id,
      title: eventTitle?.value,
      place: eventPlace?.value,
      start_time: getServerTimeFromMoment(getMomentObjFromServer(startTime)),
      end_time: getServerTimeFromMoment(getMomentObjFromServer(endTime)),
      description: eventDescription?.value,
      ...(selectedCompanies.length > 0 && {
        applicable_branches: getArrayFromArrayOfObject(selectedCompanies, "key"),
      }),
      for_internal_company: internalCheck,
      for_external_company: externalCheck,
      event_attachments: [{ attachments: photo }],
    };

    const validation = validate(externalCheck ? ADD_EVENT_EXTERNAL_RULES : ADD_EVENT_INTERNAL_RULES, params);
    if (ifObjectExist(validation)) {
      loginLoader.show()
      dispatch(
        addEvent({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              console.log('came');
              loginLoader.hide()

              showToast(response.message, 'success')
              editEventModal.hide()
              getEventsApiHandler(INITIAL_PAGE)
            }
          },
          onError: (error) => () => {
            showToast(error.error_message)
            loginLoader.hide()
          },
        })
      );
    } else {
      loginLoader.hide()
      showToast(getValidateError(validation));
    }
  };

  function proceedDeleteHandler() {
    const params = {
      id: selectedEvent?.id,
      is_deleted: true
    }
    loginLoader.show()
    dispatch(
      addEvent({
        params,
        onSuccess: (response: any) => () => {
          if (response.success) {
            loginLoader.hide()
            showToast(response.message, 'success')
            deleteEventModal.hide()
            getEventsApiHandler(INITIAL_PAGE)

          }
        },
        onError: (error) => () => {
          loginLoader.hide()
          showToast(error.error_message)
        },
      })
    );

  }

  function processMarkAsClosedHandler(item) {
    console.log('element');

    const params = {
      id: item.id,
      mark_as_closed: true
    }

    loginLoader.show()

    dispatch(
      addEvent({
        params,
        onSuccess: (response: any) => () => {
          if (response.success) {
            loginLoader.hide()
            showToast(response.message, 'success')
            getEventsApiHandler(INITIAL_PAGE)

          }
        },
        onError: () => () => {
          loginLoader.hide()
        },
      })
    );

  }


  function proceedCreateEvent() {
    goTo(ROUTES['user-company-module']['add-event'])
  }

  function proceedEventsChatting(el: any) {
    console.log("el=======>>", el)
    dispatch(
      refreshEventsMessage(el)
    )
    goTo(ROUTES['user-company-module']['event-chatting'])
  }


  return (

    <>
      {events && events.length > 0 ?
        <div className="col-7 text-right my-1 ml-4">
          <Button
            text={translate('order.CREATE EVENT')}
            className="text-white"
            size={"sm"}
            onClick={proceedCreateEvent}
          />
        </div> : null}
      {
        loading && (
          <div className="d-flex justify-content-center align-item-center" style={{ minHeight: '200px', marginTop: '250px' }}>
            <Spinner />
          </div>
        )
      }
      {!loading && events && events.length > 0 ?
        <InfiniteScroll
          dataLength={events.length}
          hasMore={eventsCurrentPages !== -1}
          className='overflow-auto overflow-hide '
          style={{ overflowY: "auto" }}
          loader={<h4>
            <Spinner />
          </h4>}
          next={() => {
            if (eventsCurrentPages !== -1) {
              getEvents(eventsCurrentPages)
            }
          }
          }>

          <div className={''} >
            {
              events?.map((item: any, index: number) => {
             
                return (
                  <div key={item.id} >
                    <Card className={'shadow-none border m-3 col-7 mb--2'}  >
                      <div className="row">
                        <div className="col-11" onClick={() => {
                          if (item.mark_as_completed !== true) {
                            proceedEventsChatting(item.id)
                          }
                        }}></div>
                        <div className="col-1">

                          {item.mark_as_completed !== true && <MenuBar menuData={MY_EVENT_MENU}
                            onClick={(element) => {
                              if (element.id === MY_EVENT_MENU[0].id) {
                                editEventModal.show()
                                setSelectedEvent(item)
                                const { title, attachments, description, place, created_by, start_time, end_time, created_at, applicable_branches, for_internal_company, for_external_company } = item
                                eventTitle.set(title)
                                eventDescription.set(description)
                                eventPlace.set(place)
                                setStartTime(getDisplayTimeDateMonthYearTime(getMomentObjFromServer(start_time)))
                                setEndTime(getDisplayTimeDateMonthYearTime(getMomentObjFromServer(end_time)))
                                setInternalCheck(for_internal_company)
                                setExternalCheck(for_external_company)
                                setSelectDropzone(attachments)
                                const updatedData = applicable_branches.map(item => {
                                  return {
                                    key: item.id,
                                    name: item.register_name,
                                    value: item.register_name
                                  }
                                })

                                setSelectedCompanies(updatedData)

                              } else if (element.id === MY_EVENT_MENU[1].id) {
                                setSelectedEvent(item)
                                deleteEventModal.show()
                              }
                              else if (element.id === MY_EVENT_MENU[2].id) {
                                processMarkAsClosedHandler(item)
                              }
                            }}
                          />
                          }

                        </div>

                      </div>
                      <div className="d-flex justify-content-end">
                        {item.mark_as_completed === true && <div className="h4 text-primary">
                          Closed
                        </div>}
                      </div>
                      <div onClick={() => {
                        if (item.mark_as_completed !== true) {
                          proceedEventsChatting(item.id)
                        }
                      }
                      }>
                        <EventItem key={item.id} item={item} />
                      </div>
                      <div>
                        <CarouselImages item={item}/>
                      </div>
                    </Card>
                  </div>
                );
              })}
          </div>

        </InfiniteScroll>

        : <div className="vh-100 d-flex d-flex align-items-center justify-content-center my-3">
          <NoDataFound buttonText={'CREATE EVENT'} onClick={proceedCreateEvent} isButton />
        </div>
      }
      <Modal title={translate('common.Edit Event')!} isOpen={editEventModal.visible} onClose={editEventModal.hide}>

        <div className="col-md-9 col-lg-7">
          <Input
            heading={translate("common.title")}
            value={eventTitle.value}
            onChange={eventTitle.onChange}
          />
          {/* <Input
            heading={translate("auth.description")}
            value={eventDescription.value}
            onChange={eventDescription.onChange}
          /> */}
          <TextAreaInput
            heading={translate('auth.description')!}
            value={eventDescription.value}
            onChange={eventDescription.onChange}
            className="form-control form-control-sm"

          />
          <Input
            heading={translate('common.Place')}
            value={eventPlace.value}
            onChange={eventPlace.onChange}
          />

          <DateTimePicker
            id="time-picker"
            placeholder={'Start Time'}
            type="both"
            initialValue={(getMomentObjFromServer(startTime))}
            onChange={handleStartTimeEtaChange}
          />

          <DateTimePicker
            id="time-picker"
            placeholder={'end Time'}
            type={'both'}
            initialValue={(getMomentObjFromServer(endTime))}
            onChange={handleEndTimeEtaChange}
          />

          <div className="row col ">
            <div className="pr-3">
              <Checkbox
                id={'1'}
                disabled={isExternalDisable}
                defaultChecked={externalCheck}
                text={'External'}
                onCheckChange={
                  setExternalCheck
                }
              />
            </div>
            <Checkbox
              id={'2'}
              text={'Internal'}
              defaultChecked={internalCheck}
              onCheckChange={setInternalCheck}
            />
          </div>

          {externalCheck && (
            <MultiSelectDropDown
              heading={translate("common.company")!}
              options={modifiedCompanyDropDownData!}
              displayValue={"value"}
              defaultValue={selectedCompanies}
              onSelect={(item) => {
                setSelectedCompanies(item);
              }}
              onRemove={(item) => {
                setSelectedCompanies(item);
              }}
            />
          )}

        </div>



        <div className="col-auto pb-2">
          <div className="row">
            <ImagePicker
              defaultPicker={true}
              defaultValue={AttachmentEdit}
              size='xl'
              heading={translate("auth.attach")!}
              noOfFileImagePickers={3}
              onSelect={(image) => { }}
              onSelectImagePickers={(el) => {
                let array: any = []

                for (let i = 0; i <= el.length; i++) {
                  let editPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                  if (editPickers !== undefined) {
                    array.push(editPickers)
                  }
                }
                setPhoto(array)
              }}
            />
          </div>
        </div>


        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4 ">
            <Button
              block
              text={translate('order.Update')}
              loading={loginLoader.loader}
              onClick={submitAddEventHandler}
            />
          </div>
        </div>


      </Modal>
      <Modal isOpen={deleteEventModal.visible} size="md" onClose={deleteEventModal.hide}>
        <div>
          <div className="h4"> Are you sure you want to delete? </div>
          <div className="row d-flex justify-content-end">
            <Button text={'Delete'}
            loading={loginLoader.loader}
              onClick={proceedDeleteHandler}
            />
          </div>
        </div>
      </Modal>

    </>

  )
}

export { Events }



