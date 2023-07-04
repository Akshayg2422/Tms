import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, NoDataFound, Spinner } from "@Components";
import { useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { useSelector, useDispatch } from "react-redux";
import { BroadCastListedItems, Home } from "@Modules";
import { getBroadCastMessages } from "@Redux";
import { INITIAL_PAGE } from '@Utils'



function Broadcast() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(false)
  const { broadCastDetails, broadCastCurrentPage } = useSelector(
    (state: any) => state.CommunicationReducer
  );

  useEffect(() => {
    getBroadCastMessage(INITIAL_PAGE)
  }, []);

  function getBroadCastMessage(page_number: number) {
     setLoading(true)
    const params = { page_number };

    dispatch(
      getBroadCastMessages({
        params,
        onSuccess: () => () => {
          setLoading(false)
        },
        onError: () => () => {
          setLoading(false)
        },
      })
    );
  }

  function proceedCreateBroadcast() {
    goTo(ROUTES["message-module"]["create-broadcast"])
  }

  return (
    <>
       
      {broadCastDetails && broadCastDetails.length > 0 ?
      
        <InfiniteScroll
          dataLength={broadCastDetails.length}
          hasMore={broadCastCurrentPage !== -1}
          className={'overflow-auto overflow-hide'}
          loader={<h4>
          </h4>}
          next={() => {
            if (broadCastCurrentPage !== -1) {
              getBroadCastMessage(broadCastCurrentPage)
            }
          }
          }>
         

          <div>
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
              {
          loading && (
            <div className="d-flex justify-content-center align-item-center" style={{minHeight:'200px'}}>
            <Spinner/>
            </div>
          )
        }
          {!loading && <NoDataFound buttonText={'create post'} onClick={proceedCreateBroadcast} isButton />}
        </div>
      }
    </>
  );
}

export { Broadcast };

