import React, { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Card, NoDataFound, Spinner, Image } from "@Components";
import { useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { EventItem } from "@Modules";
import { getEvents } from "@Redux";
import { INITIAL_PAGE } from '@Utils'

function Events() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const { events, eventsCurrentPages } = useSelector(
    (state: any) => state.UserCompanyReducer
  );




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

  function proceedCreateEvent() {
    goTo(ROUTES['user-company-module']['add-event'])
  }

  console.log("eventsCurrentPages", eventsCurrentPages)

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
    </>

  )
}

export { Events }

