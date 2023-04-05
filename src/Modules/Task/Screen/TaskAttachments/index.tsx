import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "@Hooks";
import { Card, Image, NoDataFound } from "@Components";
import { translate } from "@I18n";
import { getTaskEvents } from "@Redux";
import { getPhoto, MEA } from "@Utils";

function TaskAttachments() {
  const dispatch = useDispatch();
  const search = useInput("");
  const { taskEvents } = useSelector((state: any) => state.CompanyReducer);
  const { taskItem,getReferenceId } = useSelector((state: any) => state.AdminReducer);

  useEffect(() => {
    const params = {
      task_id:getReferenceId?getReferenceId.id:taskItem.id,
      event_type: MEA,
    };

    dispatch(
      getTaskEvents({
        params,
        onSuccess: () => () => { },
        onFailure: () => () => { }
      })
    );
  }, [getReferenceId,taskItem]);


  const getSearchHandler = () => {
    const params = {
      task_id:getReferenceId?getReferenceId.id:taskItem.id,
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
    <Card className={'overflow-auto overflow-hide mb--1'} style={{ height: '89vh' }}>
      <div className="input-group bg-white border  col-lg-5 col-md-5 ">
        <input
          type="text"
          className="form-control bg-transparent border border-0"
          placeholder={translate("auth.search")!}
          value={search.value}
          onChange={search.onChange}
        />
        <span className="input-group-text pointer border border-0" onClick={getSearchHandler}>  <i className="fas fa-search" /></span>
      </div>
      <div className='mt-4'>
        {
          taskEvents && taskEvents?.data.length > 0 ? taskEvents?.data.map((item: any, index: number) => {

            return (
              <>
                {item?.attachments?.attachments && <div>
                  <h4 className='my-2'> {item?.attachments?.name} </h4>
                  {
                    item?.attachments?.attachments?.map((image: any) => {

                      return (

                        <span className='mx-2'>
                          <Image className={'mb-3'} src={getPhoto(image?.attachment_file)} style={{ height: "280px", width: "295px" }} />
                        </span>
                      )
                    })
                  }
                </div>
                }
              </>
            )
          }) : <NoDataFound />

        }
      </div>



    </Card>

  )
}
export { TaskAttachments };


