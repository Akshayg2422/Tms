import { useWindowDimensions } from '@Hooks';
import { getGroupMessage, addGroupMessage, refreshChatMessage, setRefreshGroupChat, getAttachmentsMessage } from '@Redux';
import { INITIAL_PAGE } from '@Utils';
import { useEffect, useState } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch, useSelector } from 'react-redux';

import { Chat } from '@Components'
import { useParams } from 'react-router-dom';

function GetEventMessage() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { eventsMessage, refreshEventMessage, eventAttachmentsMessage ,eventAttachmentsMessageCurrentPages} = useSelector((state: any) => state.TaskReducer);
  

    const { height } = useWindowDimensions()
    const [hasSuccess, setHasSuccess] = useState(false)

    useEffect(() => {
        getAttachmentsMessageApi(INITIAL_PAGE)
    }, [eventsMessage, id, refreshEventMessage])

    const getAttachmentsMessageApi = (page_number: number) => {
      

        const params = {
            event_id: eventsMessage,
            page_number
        }

        dispatch(
            getAttachmentsMessage({
                params,
                onSuccess: (response: any) => () => {
                  

                    
                },
                onError: () => () => { },
            })
        );
    };


    const addGroupMessageApiHandler = (params: any) => {
        dispatch(
            addGroupMessage({
                params,
                onSuccess: () => () => {
                    setHasSuccess(true)
                    dispatch(setRefreshGroupChat())
                },
                onError: () => () => {

                },
            })
        );

    };



    return (

        <Chat
            isSuccess={hasSuccess}
            onDelete={(item) => {
                const params = {
                    id: item?.id,
                    is_deleted: true
                }
                setHasSuccess(false)
                addGroupMessageApiHandler(params)
            }}

            onEdit={(params) => {

                setHasSuccess(false)
                addGroupMessageApiHandler(params)
            }}
            variant={'group'}
            height={height}
            data={eventAttachmentsMessage}
            hasMore={eventAttachmentsMessageCurrentPages !== -1}
            onNext={() => {
                if (eventAttachmentsMessageCurrentPages !== -1) {
                    getAttachmentsMessageApi(eventAttachmentsMessageCurrentPages)
                }
            }}
        />

    );
}

export {GetEventMessage };


