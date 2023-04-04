import React, { useEffect } from "react";
import { Button, Card, Divider, HomeContainer, NoDataFound, Spinner } from "@Components";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { BroadCastListedItems } from "@Modules";
import { getBroadCastMessages, setIsSync } from "@Redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { INITIAL_PAGE } from '@Utils'



function Broadcast() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();

  const { broadCastDetails, broadCastCurrentPage } = useSelector(
    (state: any) => state.CompanyReducer
  );

  const { isSync } = useSelector(
    (state: any) => state.AppReducer
  );

  useEffect(() => {

    if (!isSync.broadcast) {
      getBroadCastMessage(INITIAL_PAGE)
    }

  }, []);


  function getBroadCastMessage(page_number: number) {

    const params = { q: "", page_number };

    dispatch(
      getBroadCastMessages({
        params,
        onSuccess: () => () => {
          dispatch(setIsSync({
            ...isSync, broadcast: true
          }))
        },
        onError: () => () => {
        },
      })
    );
  }



  return (
    <HomeContainer>
      <div className="col text-right p-0">
        <Button
          text={translate("auth.addBroadCast")!}
          size={"sm"}
          onClick={() =>
            goTo(HOME_PATH.DASHBOARD + HOME_PATH.CREATE_BROAD_CAST)
          }
        />
      </div>

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
        : <NoDataFound />}
    </HomeContainer>
  );
}

export { Broadcast };

