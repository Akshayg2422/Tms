import { useWindowDimensions } from '@Hooks';
import { getGroupMessage, addGroupMessage, refreshChatMessage, setRefreshGroupChat } from '@Redux';
import { INITIAL_PAGE } from '@Utils';
import { useEffect, useState } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch, useSelector } from 'react-redux';
import { GroupMessageProps } from './interfaces';
import { Chat } from '@Components'

function GroupMessage({ }: GroupMessageProps) {

    const dispatch = useDispatch()
    const { selectedGroupChat, refreshGroupChat, groupMessages, groupMessageCurrentPage } = useSelector((state: any) => state.UserCompanyReducer);

    const { height } = useWindowDimensions()
    const [hasSuccess, setHasSuccess] = useState(false)

    useEffect(() => {
        getGroupMessageApiHandler(INITIAL_PAGE)
    }, [selectedGroupChat, refreshGroupChat])
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const SEND_DELAY = 1000;


    const getGroupMessageApiHandler = (page_number: number) => {

        const params = {
            group_id: selectedGroupChat?.id,
            page_number,
        }

        console.log(JSON.stringify(params) + '====params');

        dispatch(
            getGroupMessage({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
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
            data={groupMessages}
            hasMore={groupMessageCurrentPage !== -1}
            onNext={() => {
                if (groupMessageCurrentPage !== -1) {
                    getGroupMessageApiHandler(groupMessageCurrentPage)
                }
            }}
        />

    );
}

export { GroupMessage };


