import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "@Hooks";
import {  HomeContainer, Image, NoDataFound } from "@Components";
import { translate } from "@I18n";
import { getTaskEvents } from "@Redux";
import { getPhoto, MEA } from "@Utils";

function TaskAttachments() {
  const dispatch = useDispatch();
  const search = useInput("");
  const { taskEvents } = useSelector((state: any) => state.CompanyReducer);
  const { taskItem } = useSelector((state: any) => state.AdminReducer);

  useEffect(() => {
    const params = {
      task_id:taskItem.id,
      event_type: MEA,
    };

    dispatch(
      getTaskEvents({
        params,
        onSuccess: () => () => { },
        onFailure: () => () => { }
      })
    );
  }, []);


  const getSearchHandler = () => {
    const params = {
      task_id: taskItem.id,
      q_many: search.value,
      event_type: MEA,
    };
    dispatch(
      getTaskEvents({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  };


  return (
    <HomeContainer isCard >
      <div style={{ height: '82.3vh' }}>
        <div className="input-group bg-white border  col-lg-5 col-md-5 ">
          <input
            type="text"
            className="form-control bg-transparent border border-0"
            placeholder={translate("auth.search")!}
            value={search.value}
            onChange={search.onChange}
          />
          <span className="input-group-text border border-0" onClick={getSearchHandler} style={{ cursor: "pointer" }} >  <i className="fas fa-search" /></span>
        </div>
        <div className='mt-4'>
          {
            taskEvents && taskEvents?.data.length > 0 ? taskEvents?.data.map((item: any, index: number) => {
              return (
                <>
                  <div>
                    <h4 className='my-2'> {item.attachments?.name} </h4>
                    {
                      item?.attachments?.attachments.map((image: any) => {
                        return (

                          <span className='mr-3 my-3'>
                            <Image src={getPhoto(image?.attachment_file)} style={{ height: "120px", width: "120px" }} />
                          </span>
                        )
                      })
                    }
                  </div>
                </>
              )
            }) : <NoDataFound />

          }
        </div>
      </div>


    </HomeContainer>

  )
}
export { TaskAttachments };

