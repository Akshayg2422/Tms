import { addPushNotification } from "@Redux";
import { FCM_TOKEN } from "@Utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface DeviceInfo {
    brand: string;
    model: string;
    platform: string;
}

function DeviceInfo() {
    const fcmTokenValue = localStorage.getItem(FCM_TOKEN)

    const dispatch = useDispatch()

    useEffect(() => {
        if (fcmTokenValue) {
            getPushNotification()
        }
    }, [fcmTokenValue]);

    const getDeviceInfo = () => {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const regex = /\(([^)]+)\)/;
        const match = regex.exec(userAgent);
        let brand
        let model
        console.log("jnfjkkja===>", userAgent, platform, match)
        if (match && match.length > 1) {
            const deviceInfo = match[1].split(';');
            brand = deviceInfo[0].trim();
            model = deviceInfo[1].trim();
            // dispatch(addPushNotification({ brand, model, platform }))
        }
        return { brand, model, platform }
    }


    function getPushNotification() {
        const params = {
            device_model: getDeviceInfo()?.model,
            device_platform: getDeviceInfo()?.platform,
            device_brand: getDeviceInfo()?.brand,
            device_token: fcmTokenValue
        }
        console.log("paramssss----------------->", params)
        dispatch(addPushNotification({
            params,
            onSuccess: (success) => () => {
                console.log("successsssss----->", success)

            },
            onError: (error) => () => {

            }
        }))
    }

    return (
        <></>
    );
}

export default DeviceInfo 