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

  console.log(broadCastDetails.length + '===');


  return (
    <HomeContainer>
      <div className="col text-right ">
        <Button
          text={translate("auth.createBroadCast")!}
          size={"sm"}
          onClick={() =>
            goTo(HOME_PATH.DASHBOARD + HOME_PATH.CREATE_BROAD_CAST)
          }
        />
      </div>

      {broadCastDetails && broadCastDetails.length > 0 &&
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
                  <div>
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
      }
    </HomeContainer>
  );
}

export { Broadcast };

// Imports necessary React components, hooks, and Redux actions.
// Defines the Broadcast component which:
// Uses the useNavigation hook to get access to the goTo function which is used to navigate to another page in the application.
// Uses the useSelector hook to access the broadCastDetails and broadCastCurrentPage values from the Redux store's CompanyReducer.
// Uses the useSelector hook to access the isSync value from the Redux store's AppReducer.
// Defines an useEffect hook that triggers the getBroadCastMessage function if isSync.broadcast is false.
// Defines the getBroadCastMessage function that dispatches a getBroadCastMessages action to fetch broadcast messages
//  using the params object and set isSync.broadcast to true upon success.
// Renders a button that navigates to the "Create Broadcast" page.
// If broadCastDetails is not null and has at least one element,
// it renders an InfiniteScroll component with a Card component that displays the list of broadcast messages using the BroadCastListedItems component.
// The InfiniteScroll component loads more broadcast messages using the getBroadCastMessage function when the user scrolls to the end of the list.
// Overall, this component fetches and displays broadcast messages, with the ability to load more messages as the user scrolls down the list.
