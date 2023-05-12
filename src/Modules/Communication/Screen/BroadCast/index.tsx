import React, { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Card, Divider, HomeContainer, NoDataFound, Spinner, Image } from "@Components";
import { useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { BroadCastListedItems, Home } from "@Modules";
import { getBroadCastMessages } from "@Redux";
import { INITIAL_PAGE } from '@Utils'



function Broadcast() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const { broadCastDetails, broadCastCurrentPage } = useSelector(
    (state: any) => state.CommunicationReducer
  );

  console.log('11111111111111111', broadCastDetails)

  useEffect(() => {
    getBroadCastMessage(INITIAL_PAGE)
  }, []);

  function getBroadCastMessage(page_number: number) {

    const params = { q: "", page_number };

    dispatch(
      getBroadCastMessages({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => {
        },
      })
    );
  }


  console.log(JSON.stringify(broadCastDetails) + '=====');

  function proceedCreateBroadcast() {
    goTo(ROUTES["message-module"]["create-broadcast"])
  }

  return (
    <>
      {broadCastDetails && broadCastDetails.length > 0 ?
        <InfiniteScroll
          dataLength={broadCastDetails.length}
          hasMore={broadCastCurrentPage !== -1}
          loader={<h4>
            <Spinner />
          </h4>}
          next={() => {
            if (broadCastCurrentPage !== -1) {
              getBroadCastMessage(broadCastCurrentPage)
            }
          }
          }>

          <div className={''} >
            {
              broadCastDetails?.map((company: any, index: number) => {
                return (
                  <div key={company.id}>
                    <Card className={'shadow-none border m-3 col-7 mb--2'}><BroadCastListedItems key={company.id} item={company} /></Card>
                  </div>
                );
              })}
          </div>

        </InfiniteScroll>
        : <div className="vh-100 d-flex d-flex align-items-center justify-content-center my-3">
          <NoDataFound buttonText={'create post'} onClick={proceedCreateBroadcast} isButton />
        </div>
      }
    </>
  );
}

export { Broadcast };

