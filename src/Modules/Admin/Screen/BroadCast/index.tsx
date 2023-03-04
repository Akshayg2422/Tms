import React, { useEffect } from "react";
import { Button, Card, Divider, HomeContainer } from "@Components";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { BroadCastListedItems } from "@Modules";
import { getBroadCastMessages, setIsSync } from "@Redux";

function Broadcast() {
  const { goTo, goBack } = useNavigation();
  const dispatch = useDispatch();
  const { broadCastDetails } = useSelector(
    (state: any) => state.CompanyReducer
  );
  const { isSync } = useSelector(
    (state: any) => state.AppReducer
  );
  console.log(broadCastDetails, "broadCastDetails");
  useEffect(() => {
    const params = { q: "" };
    if (!isSync.broadcast) {
      dispatch(
        getBroadCastMessages({
          params,
          onSuccess: () => () => {
            dispatch(setIsSync({
              ...isSync,broadcast:true
            }))
           },
          onError: () => () => { },
        })
      );
    }

  }, []);
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
      <Card title={"BroadCast"} className="mt-3">
        {broadCastDetails &&
          broadCastDetails?.data?.length > 0 &&
          broadCastDetails?.data?.map((company: any, index: number) => {
            return (
              <div>
                <BroadCastListedItems key={company.id} item={company} />
                {index !== broadCastDetails?.data?.length - 1 && (
                  <div className="mx-1">
                    <Divider />
                  </div>
                )}
              </div>
            );
          })}
      </Card>
    </HomeContainer>
  );
}

export { Broadcast };
