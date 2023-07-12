import { useWindowDimensions } from '@Hooks';
import { getGroupMessage } from '@Redux';
import { INITIAL_PAGE } from '@Utils';
import { useEffect } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch, useSelector } from 'react-redux';
import { GroupMessageProps } from './interfaces';
import { Chat } from '@Components'

function GroupMessage({ }: GroupMessageProps) {

    const dispatch = useDispatch()
    const { selectedGroupChat, refreshGroupChat, groupMessages, groupMessageCurrentPage } = useSelector((state: any) => state.UserCompanyReducer);

    const { height } = useWindowDimensions()

    useEffect(() => {
        getGroupMessageApiHandler(INITIAL_PAGE)
    }, [selectedGroupChat, refreshGroupChat])




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

    return (
        <>
            <Chat
                variant={'group'}
                height={height}
                data={groupMessages}
                hasMore={groupMessageCurrentPage !== -1}
                onNext={() => {
                    if (groupMessageCurrentPage !== -1) {
                        getGroupMessageApiHandler(groupMessageCurrentPage)
                    }
                }} />
        </>
    );
}

export { GroupMessage };


