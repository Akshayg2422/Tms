import { Send } from '@Components';
import { useLoader } from '@Hooks';
import { addGroupMessage, setRefreshGroupChat } from '@Redux';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddGroupChatProps } from './interfaces';


function AddGroupChat({ }: AddGroupChatProps) {

    const { selectedGroupChat } = useSelector((state: any) => state.UserCompanyReducer);
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false);
    const loader = useLoader(false)


    const addGroupMessageApiHandler = (params: any) => {

        loader.show();
        dispatch(
            addGroupMessage({
                params,
                onSuccess: () => () => {
                    loader.hide();
                    setSuccess(true)
                    dispatch(setRefreshGroupChat())
                },
                onError: () => () => {
                    loader.hide();
                },
            })
        );

    };

    return (
        <Send
            isSuccess={success}
            loading={loader.loader}
            onMessagePress={(message) => {
                setSuccess(false);
                const params = {
                    group_id: selectedGroupChat.id,
                    ...message,
                };

                addGroupMessageApiHandler(params);

            }}
            onAttachPress={response => {
                setSuccess(false);
                const params = {
                    group_id: selectedGroupChat.id,
                    group_attachments: [response.attachments],
                    ...response.type
                };
                addGroupMessageApiHandler(params);
            }}
        />
    )
}
export { AddGroupChat };
