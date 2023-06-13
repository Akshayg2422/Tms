
import { useNavigation } from '@Hooks';
import { useEffect, useRef, useState } from 'react';
import { JitsiMeeting, JaaSMeeting } from '@jitsi/react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '@Routes';
import { getTokenByUser, selectedVcDetails, vcNotificationDetails } from '@Redux';

const VideoConference = () => {

    useEffect(() => {

    }, [])

    const { scheduledListData, dashboardDetails, userToken, settingVcDetails, vcNotificationData } = useSelector((state: any) => state.UserCompanyReducer);

    console.log("userToken", settingVcDetails)

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

                console.log("success============>", success)
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
        goBack(-1)
        console.log()
    };

    useEffect(() => {
        generateRoomName()
    }, [])

    const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;



    const renderSpinner = () => (
        <div className='d-flex h-100vh justify-content-center align-items-center'
            style={{
                backgroundColor: '#141414'
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
                    getIFrameRef={(iframeRef) => { iframeRef.style.height = '100vh'; iframeRef.style.padding = "0px"; iframeRef.style.margin = "0px" }}
                    configOverwrite={{
                        startWithAudioMuted: true,
                        disableModeratorIndicator: false,
                        startScreenSharing: false,
                        enableEmailInStats: false,
                        prejoinPageEnabled: false,
                        maxFullResolutionParticipants: -1,
                        brandingRoomAlias: null,

                        // securityUi: {
                        //     hideLobbyButton: true,
                        //     disableLobbyPassword: false
                        // },

                        // Disable measuring of audio levels.
                        // disableAudioLevels: false,

                        // Disables polls feature.
                        // disablePolls: false,

                        // Disables self-view tile. (hides it from tile view and from filmstrip)
                        // disableSelfView: false,

                        // Disables self-view settings in UI
                        // disableSelfViewSettings: false,

                        // screenshotCapture : {
                        //  Enables the screensharing capture feature.
                        //  enabled: true,

                        //  The mode for the screenshot capture feature.
                        //  Can be either 'recording' - screensharing screenshots are taken
                        //  only when the recording is also on,
                        //  or 'always' - screensharing screenshots are always taken.
                        //  mode: 'recording',
                        // },

                        //to disable reaction icons
                        // disableReactions: true,

                        // recode params---------------
                        // enableRecording:true

                        //restrict buttons---------------

                        constraints: {
                            video: {
                                height: {
                                    ideal: 720,
                                    max: 720,
                                    // min: 240
                                }
                            }
                        },

                        ...(dashboardDetails?.user_details?.is_faculty === false && { toolbarButtons: ['hangup', 'microphone', 'camera'] }),

                        // Sets the preferred resolution (height) for local video. Defaults to 720.
                        resolution: 1080,

                        // When 'true', the user cannot edit the display name.
                        // (Mainly useful when used in conjunction with the JWT so the JWT name becomes read only.)
                        // readOnlyName: true,

                        // Every participant after the Nth will start video muted.
                        // startVideoMuted: 10,

                        // Optional desktop sharing frame rate options. Default value: min:5, max:5.
                        // desktopSharingFrameRate: {
                        //     min: 5,
                        //     max: 5,
                        // },

                        // Local recording configuration.
                        // localRecording: {
                        //     // Whether to disable local recording or not.
                        // disable: false,

                        //     // Whether to notify all participants when a participant is recording locally.
                        //     notifyAllParticipants: false,

                        //     // Whether to disable the self recording feature (only local participant streams).
                        //     disableSelfRecording: false,
                        // },

                        // videoQuality: {
                        //     disabledCodec: 'H264',
                        //     preferredCodec: 'VP8',
                        //     maxBitratesVideo: {
                        //         H264: {
                        //             low: 200000,
                        //             standard: 500000,
                        //             high: 1500000
                        //         },
                        //         VP8: {
                        //             low: 200000,
                        //             standard: 500000,
                        //             high: 1500000
                        //         },
                        //         VP9: {
                        //             low: 100000,
                        //             standard: 300000,
                        //             high: 1200000
                        //         }
                        //     },
                        //     minHeightForQualityLvl: {
                        //         // 360: 'standard',
                        //         720: 'high'
                        //     },
                        //     resizeDesktopForPresenter: false
                        // }
                    }}

                    interfaceConfigOverwrite={{
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                        // TOOLBAR_BUTTONS: [
                        //     "microphone", 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                        //     'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
                        //     'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                        //     'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                        //     'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                        //     'e2ee'
                        // //     ],
                        // TOOLBAR_BUTTONS: [
                        //     "microphone", 'camera', 'fullscreen', 'hangup', 'chat', 'raisehand', 'filmstrip','tileview', 'e2ee',
                        //     "desktop"
                        // ],
                    }}
                    spinner={renderSpinner}
                    onApiReady={externalApi => handleApiReady(externalApi)}
                    onReadyToClose={handleReadyToClose}
                // getIFrameRef={handleJitsiIFrameRef1}
                />

            </div>
                :
                <div className='d-flex h-100vh justify-content-center align-items-center'
                    style={{
                        backgroundColor: '#141414'
                    }}
                >
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </>
    );
};

export { VideoConference };