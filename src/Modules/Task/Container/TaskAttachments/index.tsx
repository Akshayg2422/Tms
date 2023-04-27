import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useWindowDimensions } from "@Hooks";
import { Card, Image, NoDataFound, SearchInput, Divider } from "@Components";
import { translate } from "@I18n";
import { getTaskEvents } from "@Redux";
import { getPhoto, MEA, capitalizeFirstLetter } from "@Utils";

function TaskAttachments() {

  const dispatch = useDispatch();
  const search = useInput("");
  const { selectedTask, taskEvents } = useSelector((state: any) => state.TaskReducer);
  const { height } = useWindowDimensions()

  useEffect(() => {
    getTaskEventsApiHandler(search.value)
  }, [search.value, selectedTask]);


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
    <Card className="overflow-auto" style={{
      height: height - 60
    }}>
      <div className="row text-right">
        <div className="col-5" >
          <SearchInput onSearch={search.set} />
        </div>
      </div >

      <div className='mt-4 h-100'>
        {
          taskEvents && taskEvents?.length > 0 ? taskEvents?.map((item: any, index: number) => {
            const { attachments } = item
            return (
              <>
                {attachments?.attachments && <div>
                  <h4 className="mb-0"> {capitalizeFirstLetter(attachments?.name)} </h4>
                  {
                    attachments?.attachments?.map((image: any) => {
                      return (
                        <Image className={'mb-3'} src={getPhoto(image?.attachment_file)} style={{ height: "100px", width: "100px" }} />
                      )
                    })
                  }
                </div>
                }
                {index !== taskEvents.length - 1 && <Divider space={'3'} />}
              </>
            )
          }) : <div className="d-flex align-items-center justify-content-center h-100"><NoDataFound type={'text'} /></div>

        }
      </div>

    </Card >

  )
}
export { TaskAttachments };


