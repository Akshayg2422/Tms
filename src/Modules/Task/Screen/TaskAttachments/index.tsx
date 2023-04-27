import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "@Hooks";
import { Card, Image, NoDataFound, SearchInput } from "@Components";
import { translate } from "@I18n";
import { getTaskEvents } from "@Redux";
import { getPhoto, MEA } from "@Utils";

function TaskAttachments() {

  const dispatch = useDispatch();
  const search = useInput("");
  const { selectedTask, taskEvents } = useSelector((state: any) => state.TaskReducer);

  useEffect(() => {
    getTaskEventsApiHandler(search.value)
  }, [search.value]);


  function getTaskEventsApiHandler(q_many: string) {
    const params = {
      task_id: selectedTask.id,
      event_type: MEA,
      q_many
    };

    console.log(JSON.stringify(params));
    dispatch(
      getTaskEvents({
        params,
        onSuccess: () => () => { },
        onFailure: () => () => { }
      })
    );
  }

  return (
    <Card>
      <div className="row text-right">
        <div className="col-5">
          <SearchInput onSearch={search.set} />
        </div>
      </div>

      <div className='mt-4'>
        {
          taskEvents && taskEvents?.length > 0 ? taskEvents?.map((item: any, index: number) => {
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
          }) : <NoDataFound type={'text'} />

        }
      </div>



    </Card>

  )
}
export { TaskAttachments };


