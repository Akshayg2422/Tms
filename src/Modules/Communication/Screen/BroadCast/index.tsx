import React, { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Card, Divider, HomeContainer, NoDataFound, Spinner, Image } from "@Components";
import { useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { BroadCastListedItems } from "@Modules";
import { getBroadCastMessages } from "@Redux";
import { INITIAL_PAGE } from '@Utils'



function Broadcast() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const { broadCastDetails, broadCastCurrentPage } = useSelector(
    (state: any) => state.CommunicationReducer
  );



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
      <HomeContainer className="m-3">
        {broadCastDetails && broadCastDetails.length > 0 ?
          <div className="col text-right p-0">
            <Button
              text={translate("auth.addBroadCast")!}
              size={"sm"}
              onClick={proceedCreateBroadcast}
            />
          </div> : null}

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

            <Card title={"BroadCast"} className="mt-3">
              {
                broadCastDetails?.map((company: any, index: number) => {
                  return (
                    <div key={company.id}>
                      <BroadCastListedItems key={company.id} item={company} />
                      {index !== broadCastDetails?.length - 1 && (
                        <div className="mx-1">
                          <Divider />
                        </div>
                      )}
                    </div>
                  );
                })}
            </Card>

          </InfiniteScroll>
          : <div className="vh-100 d-flex d-flex align-items-center justify-content-center my-3">
            <NoDataFound buttonText={'create broadcast'} onClick={proceedCreateBroadcast} />
          </div>
        }
      </HomeContainer>
    </>
  );
}

export { Broadcast };

