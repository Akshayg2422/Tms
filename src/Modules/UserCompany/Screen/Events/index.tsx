import React, { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Card, Divider, HomeContainer, NoDataFound, Spinner, Image } from "@Components";
import { useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { EventItem, MyFeedItem } from "@Modules";
import { getBroadCastMessages, getEvents } from "@Redux";
import { INITIAL_PAGE } from '@Utils'

function Events() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const { events } = useSelector(
    (state: any) => state.UserCompanyReducer
  );



  useEffect(() => {
    //getBroadCastMessage(INITIAL_PAGE)
    getEventsApiHandler()
  }, []);


  const getEventsApiHandler = () => {
    const params = {}
    dispatch(
      getEvents({
        params,
        onSuccess: (response) => () => {
          console.log("response", response)
        },
        onError: () => () => { },
      })
    )
  }

  function proceedCreateBroadcast() {
    goTo(ROUTES['user-company-module']['add-event'])
  }

  console.log("events", events)

  return (

    <>
      {events && events.length > 0 ?
        <div className="col-9 text-right my-1">
          <Button
            text={'CREATE EVENT'}
            className="text-white"
            size={"sm"}
            onClick={proceedCreateBroadcast}
          />
        </div> : null}
      {events && events.length > 0 ?
        // <InfiniteScroll
        //   dataLength={events.length}
        //   hasMore={broadCastCurrentPage !== -1}
        //   loader={<h4>
        //     <Spinner />
        //   </h4>}
        //   next={() => {
        //     if (broadCastCurrentPage !== -1) {
        //       getBroadCastMessage(broadCastCurrentPage)
        //     }
        //   }
        //   }>

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

        // </InfiniteScroll>

        : <div className="vh-100 d-flex d-flex align-items-center justify-content-center my-3">
          <NoDataFound buttonText={'create post'} onClick={proceedCreateBroadcast} isButton />
        </div>
      }
    </>

  )
}

export { Events }

