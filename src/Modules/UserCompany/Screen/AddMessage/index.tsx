import { Send } from '@Components';
import { useLoader ,useNavigation} from '@Hooks';
import { addGroupMessage, getTokenByUser, handleOneToOneVcNoti, selectedVcDetails, setRefreshGroupChat } from '@Redux';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddGroupChatProps } from './interfaces';
import { ROUTES } from '@Routes';


function AddGroupChat({ }: AddGroupChatProps) {

    const { selectedGroupChat,dashboardDetails  } = useSelector((state: any) => state.UserCompanyReducer);
    const { user_details } = dashboardDetails || {}
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false);
    const loader = useLoader(false)
    const {goTo}=useNavigation()


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

    const getUserToken = () => {
         dispatch(selectedVcDetails(selectedGroupChat.id))
        const params = {
            room_id: selectedGroupChat.id,
            user_name: user_details.name,
            email_id: user_details.email,
            // room_id:,
        }
    
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {
        
                dispatch(setRefreshGroupChat())
                dispatch(handleOneToOneVcNoti(success?.message))
            },
            onError: (error: string) => () => {
             
              
             },
        }))
    }

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
                    chat_attachments: [response.attachments],
                    ...response.type
                };
                addGroupMessageApiHandler(params);
            }}

            onVideoPress={() => {
                getUserToken()
                goTo(ROUTES['user-company-module']['video-conference'], false)

            }}
        />
    )
}
export { AddGroupChat };
