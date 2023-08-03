import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, NoDataFound, Spinner } from "@Components";
import { useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { CarouselImages, EventItem } from "@Modules";
import { getEvents, refreshEventsMessage } from "@Redux";
import { INITIAL_PAGE } from '@Utils'
function Events() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  const { events, eventsCurrentPages } = useSelector(
    (state: any) => state.UserCompanyReducer
  );


  useEffect(() => {

    getEventsApiHandler(INITIAL_PAGE)
  }, []);


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




  function proceedEventsChatting(el: any) {

    dispatch(
      refreshEventsMessage(el)
    )
    goTo(ROUTES['user-company-module']['event-chatting'])
  }


  return (

    <div className="ml-3">

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
              getEventsApiHandler(eventsCurrentPages)
            }
          }
          }>

          <div >
            {
              events?.map((item: any, index: number) => {

                return (
                  <div key={item.id} >
                    <Card className={'shadow-none border col-7 mt-3 mb-3'}  >
                      <div className="row">
                        <div className="col-12" onClick={() => {
                          if (item.mark_as_completed !== true) {
                            proceedEventsChatting(item.id)
                          }
                        }}></div>

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
                        <CarouselImages item={item} />
                      </div>
                    </Card>
                  </div>
                );
              })}
          </div>

        </InfiniteScroll>

        : <div className="vh-100 d-flex d-flex align-items-center justify-content-center my-3">
          {
            loading ? (
              <div className="d-flex justify-content-center align-item-center" style={{ minHeight: '200px' }}>
                <Spinner />
              </div>
            ) : <div className="vh-100 d-flex d-flex align-items-center justify-content-center my-3">
              <NoDataFound />
            </div>
          }
        </div>
      }


    </div>

  )
}

export { Events }



