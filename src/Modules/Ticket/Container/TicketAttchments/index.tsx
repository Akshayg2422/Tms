import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useModal, useWindowDimensions } from "@Hooks";
import { Card, Image, SearchInput, Divider, Spinner, Modal } from "@Components";
import { getTicketEventAttachments } from "@Redux";
import { getPhoto, MEA, capitalizeFirstLetter, INITIAL_PAGE } from "@Utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";

function TicketAttachments() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const search = useInput("");
  const imageModal = useModal(false)
  const [image, setImage] = useState([])
  const { ticketEventAttachments, ticketEventAttachmentsCurrentPage, refreshTicketEvents } = useSelector((state: any) => state.TicketReducer);
  const { height } = useWindowDimensions()



  useEffect(() => {
    getTicketEventsApiHandler(INITIAL_PAGE, search.value,)
  }, [search.value, refreshTicketEvents, id]);


  function getTicketEventsApiHandler(page_number: number, q_many?: string) {

    const params = {
      code: id,
      event_type: MEA,
      q_many,
      page_number
    };

    dispatch(
      getTicketEventAttachments({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => { }
      })
    );
  }


  console.log('=====>', image)
  return (
    <>
      <Card className="overflow-auto" style={{
        height: height - 15
      }}>
        <div className="row text-right">
          <div className="col-5" >
            <SearchInput onSearch={search.set} />
          </div>
        </div >
        {ticketEventAttachments && ticketEventAttachments.length > 0 && <InfiniteScroll
          dataLength={ticketEventAttachments.length}
          hasMore={ticketEventAttachmentsCurrentPage !== -1}
          loader={<h4>
            <Spinner />
          </h4>}

          next={() => {
            if (ticketEventAttachmentsCurrentPage !== -1) {
              getTicketEventsApiHandler(ticketEventAttachmentsCurrentPage)
            }
          }
          }>
          <div className="mt-3">
            {
              ticketEventAttachments && ticketEventAttachments?.length > 0 && ticketEventAttachments?.map((item) => {
                const { attachments } = item
                return (
                  <div onClick={() => {
                    imageModal.show()
                    setImage(attachments?.attachments)
                  }} >
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
      
      <Modal isOpen={imageModal.visible} onClose={imageModal.hide} size={'lg'}>
        <Carousel autoPlay>
          {

            image.map((el: any) => {
              return <Image src={getPhoto(el?.attachment_file)} height={'600px'} width={'800px'} />
            })
          }
        </Carousel>
      </Modal>


    </>

  )
}
export { TicketAttachments };


