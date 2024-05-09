
import { useNavigation } from '@Hooks';
import { useEffect, useRef, useState } from 'react';
import { JitsiMeeting, JaaSMeeting } from '@jitsi/react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '@Routes';
import { getTokenByUser, handleOneToOneChat, postChatMessage, selectedVcDetails, vcNotificationDetails } from '@Redux';
import moment from 'moment';


interface VideoConferenceProps {

    iframeHeight?: any
    chatCall?: any
}

const VideoConference = ({ iframeHeight = "100vh", chatCall = false }: VideoConferenceProps) => {

    useEffect(() => {

    }, [])

    const { scheduledListData, dashboardDetails, userToken, settingVcDetails, vcNotificationData, oneToOneVcNoti } = useSelector((state: any) => state.UserCompanyReducer);

    console.log("userToken=======<>>>", settingVcDetails)

    const apiRef = useRef<any>();
    const [logItems, updateLog] = useState<any>([]);
    const [showNew, toggleShowNew] = useState<any>(false);
    const [knockingParticipants, updateKnockingParticipants] = useState<any>([]);
    const [roomName, setRoomName] = useState<any>(settingVcDetails?.room_name ? settingVcDetails?.room_name.replace(/\s/g, '').replace(/-/g, '') : settingVcDetails ? settingVcDetails.replace(/\s/g, '').replace(/-/g, '') : vcNotificationData?.route_params?.room_name ? vcNotificationData?.route_params?.room_name.replace(/\s/g, '').replace(/-/g, '') : vcNotificationData?.route_params?.reference_id ? vcNotificationData?.route_params?.reference_id.replace(/\s/g, '').replace(/-/g, '') : 'Meetings')
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()
    const { company_branch, user_details, company } = dashboardDetails || ''


    console.log("vcNotificationData", settingVcDetails)


    useEffect(() => {
        if (vcNotificationData) {
            getUserToken()
        }
        return (() => {
            dispatch(selectedVcDetails(undefined))
            dispatch(vcNotificationDetails(undefined))
        })
    }, [])


    const getUserToken = () => {

        const params = {

            user_name: user_details.name,
            email_id: user_details.email,
        }
        dispatch(getTokenByUser({
            params,
            onSuccess: (success: any) => () => {

              
            },
            onError: (error: string) => () => {

            },

        }))
    }
    

    const addChatMessage = () => {
        const params = {
            id: oneToOneVcNoti,
            call_end_time: moment().format()
        }
        dispatch(postChatMessage({
            params,
            onSuccess: (success: any) => async () => {
         

            },
            onError: (error: string) => () => {
            },
        }))
    }


    const printEventOutput = payload => {
        
        updateLog(items => [...items, JSON.stringify(payload)]);
    };

    const handleAudioStatusChange = (payload, feature) => {
        if (payload.muted) {
            updateLog(items => [...items, `${feature} off`])
        } else {
            updateLog(items => [...items, `${feature} on`])
        }
    };

    const handleChatUpdates = payload => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        apiRef.current.executeCommand('toggleChat');
        updateLog(items => [...items, `you have ${payload.unreadCount} unread messages`])
    };


    // const handleKnockingParticipant = payload => {
    //     updateLog(items => [...items, JSON.stringify(payload)]);
    //     updateKnockingParticipants(participants => [...participants, payload?.participant])
    // };

    const resolveKnockingParticipants = condition => {
        knockingParticipants.forEach(participant => {
            apiRef.current.executeCommand('answerKnockingParticipant', participant?.id, condition(participant));
            updateKnockingParticipants(participants => participants.filter(item => item.id === participant.id));
        });
    };

    // const handleJitsiIFrameRef1 = iframeRef => {
    //     iframeRef.style.border = '10px solid #3d3d3d';
    //     iframeRef.style.background = '#3d3d3d';
    //     iframeRef.style.height = '400px';
    //     iframeRef.style.marginBottom = '20px';
    // };

    const handleJitsiIFrameRef2 = iframeRef => {
        iframeRef.style.marginTop = '10px';
        iframeRef.style.border = '10px dashed #df486f';
        iframeRef.style.padding = '5px';
        iframeRef.style.height = '400px';
    };

    const handleJaaSIFrameRef = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '400px';
        iframeRef.style.marginBottom = '20px';
    };

    const handleApiReady = apiObj => {
        console.log("0000000000000", apiObj)
        apiRef.current = apiObj;
        // apiRef.current.on('knockingParticipant', handleKnockingParticipant);
        apiRef.current.on('audioMuteStatusChanged', payload => handleAudioStatusChange(payload, 'audio'));
        apiRef.current.on('videoMuteStatusChanged', payload => handleAudioStatusChange(payload, 'video'));
        apiRef.current.on('raiseHandUpdated', printEventOutput);
        apiRef.current.on('titleViewChanged', printEventOutput);
        apiRef.current.on('chatUpdated', handleChatUpdates);
        // apiRef.current.on('knockingParticipant', handleKnockingParticipant);
    };

    const handleReadyToClose = () => {
        if (!chatCall) {
            goBack(-1)
        }
        else {
            dispatch(handleOneToOneChat(false))
            addChatMessage()
        }
    };

    useEffect(() => {
        generateRoomName()
      
        
    }, [])

    const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;



    const renderSpinner = () => (
        <div className='d-flex justify-content-center align-items-center'
            style={{
                backgroundColor: '#141414',
                height: iframeHeight
            }}
        >
            <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );


    return (
        <>
            {userToken ? <div className=' m-0 h-100vh ' >

                <JitsiMeeting
                    domain={"meetings.quantaedat.com"}
                    jwt={userToken}
                    roomName={`${roomName}`}
                    getIFrameRef={(iframeRef) => { iframeRef.style.height = iframeHeight; iframeRef.style.padding = "0px"; iframeRef.style.margin = "0px" }}
                    configOverwrite={{
                        startWithAudioMuted: true,
                        disableModeratorIndicator: false,
                        startScreenSharing: false,
                        enableEmailInStats: false,
                        prejoinPageEnabled: false,
                        maxFullResolutionParticipants: -1,
                        brandingRoomAlias: null,


                        constraints: {
                            video: {
                                height: {
                                    ideal: 720,
                                    max: 720,
                                    // min: 240
                                }
                            }
                        },

                        // ...(dashboardDetails?.user_details?.is_faculty === false && { toolbarButtons: ['hangup', 'microphone', 'camera'] }),

                        // Sets the preferred resolution (height) for local video. Defaults to 720.
                        resolution: 1080,


                    }}

                    interfaceConfigOverwrite={{
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,

                    }}
                    spinner={renderSpinner}
                    onApiReady={externalApi => handleApiReady(externalApi)}
                    onReadyToClose={handleReadyToClose}
                // getIFrameRef={handleJitsiIFrameRef1}
                />

            </div>
                :
                <>
                    <div className=' d-flex justify-content-center align-items-center' style={{
                        backgroundColor: '#141414',
                        height: iframeHeight
                    }}>
                        <div
                            className="spinner-border text-light fa-lg" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export { VideoConference };