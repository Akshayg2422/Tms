import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Card, NoDataFound, Spinner, Image, Modal, MenuBar, showToast, Checkbox, DateTimePicker, Input, Dropzone, MultiSelectDropDown } from "@Components";
import { useInput, useModal, useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { EventItem } from "@Modules";
import { addEvent, getAssociatedCompanyBranch, getEvents } from "@Redux";
import { ADD_EVENT_EXTERNAL_RULES, ADD_EVENT_INTERNAL_RULES, INITIAL_PAGE, getArrayFromArrayOfObject, getDisplayTimeDateMonthYearTime, getMomentObjFromServer, getPhoto, getValidateError, ifObjectExist, validate } from '@Utils'
import { icons } from "@Assets";

function Events() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const { events, eventsCurrentPages } = useSelector(
    (state: any) => state.UserCompanyReducer
  );

  const MY_EVENT_MENU = [
    {
      id: 0, name: 'Edit', icon: icons.edit,
    },
    {
      id: 1, name: 'delete', icon: icons.deleteCurve,
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


  let attach = photo.slice(-2, 4)

  const handleImagePicker = (index: number, file: any) => {
    let newUpdatedPhoto = [...photo, file];
    setPhoto(newUpdatedPhoto);
  };


  useEffect(() => {
    getEventsApiHandler(INITIAL_PAGE)
  }, []);


  const getEventsApiHandler = (page_number: number) => {
    const params = { page_number }
    dispatch(
      getEvents({
        params,
        onSuccess: (response) => () => {
        },
        onError: () => () => { },
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
      start_time: startTime,
      end_time: endTime,
      description: eventDescription?.value,
      ...(selectedCompanies.length > 0 && {
        applicable_branches: getArrayFromArrayOfObject(selectedCompanies, "key"),
      }),
      ...(internalCheck && { for_internal_company: true }),
      ...(externalCheck && { for_external_company: true }),
      event_attachments: [{ attachments: attach }],
    };

    const validation = validate(externalCheck ? ADD_EVENT_EXTERNAL_RULES : ADD_EVENT_INTERNAL_RULES, params);
    if (ifObjectExist(validation)) {
      dispatch(
        addEvent({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              console.log('came');

              showToast(response.message, 'success')
              editEventModal.hide()
               getEventsApiHandler(INITIAL_PAGE)
            }
          },
          onError: (error) => () => {
            showToast(error.error_message)
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  };

  function proceedDeleteHandler() {
    const params = {
      id: selectedEvent?.id,
      is_deleted: true
    }

    dispatch(
      addEvent({
        params,
        onSuccess: (response: any) => () => {
          if (response.success) {
            showToast(response.message, 'success')
            deleteEventModal.hide()
            getEventsApiHandler(INITIAL_PAGE)

          }
        },
        onError: (error) => () => {
          showToast(error.error_message)
        },
      })
    );

  }



  function proceedCreateEvent() {
    goTo(ROUTES['user-company-module']['add-event'])
  }


  return (

    <>
      {events && events.length > 0 ?
        <div className="col-9 text-right my-1">
          <Button
            text={'CREATE EVENT'}
            className="text-white"
            size={"sm"}
            onClick={proceedCreateEvent}
          />
        </div> : null}
      {events && events.length > 0 ?
        <InfiniteScroll
          dataLength={events.length}
          hasMore={eventsCurrentPages !== -1}
          className='overflow-auto scroll-hidden'
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
                  <div key={item.id}>
                    <Card className={'shadow-none border m-3 col-9 mb--2'}>
                      <div className="row d-flex justify-content-end mt-3">
                        <MenuBar menuData={MY_EVENT_MENU}
                          onClick={(element) => {
                            if (element.id === MY_EVENT_MENU[0].id) {
                              editEventModal.show()
                              setSelectedEvent(item)
                              const { title, attachments, description,place,created_by,start_time,end_time, created_at, applicable_branches, for_internal_company, for_external_company } = item
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
                          }}
                        />
                      </div>
                      <EventItem key={item.id} item={item} />
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
      <Modal title={'Edit Event'} isOpen={editEventModal.visible} onClose={editEventModal.hide}>

        <div className="col-md-9 col-lg-7">
          <Input
            heading={translate("common.title")}
            value={eventTitle.value}
            onChange={eventTitle.onChange}
          />
          <Input
            heading={translate("auth.description")}
            value={eventDescription.value}
            onChange={eventDescription.onChange}
          />
          <Input
            heading={'Place'}
            value={eventPlace.value}
            onChange={eventPlace.onChange}
          />

          <DateTimePicker
            id="time-picker"
            placeholder={'Start Time'}
            type="both"
            initialValue={startTime}
            onChange={handleStartTimeEtaChange}
          />

          <DateTimePicker
            id="time-picker"
            placeholder={'end Time'}
            type={'both'}
            initialValue={endTime}
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


        <div className="col">
          <label className={`form-control-label`}>
            {translate("auth.attach")}
          </label>
        </div>

        <div className="col-md-9 col-lg-7 pb-4 ">
          {selectDropzone &&
            selectDropzone.map((el: any, index: number) => {
              return (
                <Dropzone
                  variant="ICON"
                  icon={getPhoto(el?.attachment_file)}
                  size="xl"
                  onSelect={(image) => {
                    let file = image.toString().replace(/^data:(.*,)?/, "");
                    handleImagePicker(index, file);
                    setSelectDropzone([{ id: "1" }, { id: "2" }]);
                  }}
                />
              );
            })}
        </div>

        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4 ">
            <Button
              block
              text={'Update'}
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
            onClick={proceedDeleteHandler} 
            />
          </div>
        </div>
      </Modal>
    </>

  )
}

export { Events }



