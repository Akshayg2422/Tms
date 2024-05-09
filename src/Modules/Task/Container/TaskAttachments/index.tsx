import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useWindowDimensions } from "@Hooks";
import { Card, Image, SearchInput, Divider, Spinner } from "@Components";
import { getTaskEventAttachments } from "@Redux";
import { getPhoto, MEA, capitalizeFirstLetter, INITIAL_PAGE } from "@Utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

function TaskAttachments() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const search = useInput("");
  const { taskEventAttachments, taskEventAttachmentsCurrentPage, refreshTaskEvents } = useSelector((state: any) => state.TaskReducer);
  const { height } = useWindowDimensions()

  useEffect(() => {
    getTaskEventsApiHandler(INITIAL_PAGE, search.value,)
  }, [search.value, refreshTaskEvents, id]);


  function getTaskEventsApiHandler(page_number: number, q_many?: string) {

    const params = {
      code: id,
      event_type: MEA,
      q_many,
      page_number
    };

    dispatch(
      getTaskEventAttachments({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => { }
      })
    );
  }

  return (
    <>
      <Card className="overflow-auto" style={{
        height: height - 75
      }}
      >
        <div className="row text-right">
          <div className="col-5" >
            <SearchInput onSearch={search.set} />
          </div>
        </div >
        
        {taskEventAttachments && taskEventAttachments.length > 0 && <InfiniteScroll
          dataLength={taskEventAttachments.length}
          hasMore={taskEventAttachmentsCurrentPage !== -1}
         
          next={() => {
            if (taskEventAttachmentsCurrentPage !== -1) {
              getTaskEventsApiHandler(taskEventAttachmentsCurrentPage)
            }
          }
          
          }
          loader={<h4>
            <Spinner />
          </h4>}>
          <div className="mt-3">
            {
              taskEventAttachments && taskEventAttachments?.length > 0 && taskEventAttachments?.map((item: any, index: number) => {
                const { attachments } = item
                return (
                  <div >
                    {attachments?.attachments && <div>
                      <h4 className="mb-2"> {capitalizeFirstLetter(attachments?.name)} </h4>
                      {
                        attachments?.attachments?.map((image: any) => {
                          return (
                          
                             <Image className={'mb-3 ml-2'} src={getPhoto(image?.attachment_file)} style={{ height: "100px", width: "100px" }} />
                          )
                        })
                      }
                    </div>
                    }
                  </div>
                )
              })
            }
          </div>
        </InfiniteScroll>}
            
      </Card >


    </>

  )
}
export { TaskAttachments };


