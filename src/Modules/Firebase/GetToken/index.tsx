import { messaging } from '../Config'
import React, { useEffect } from 'react'
import { getToken, onMessage } from "firebase/messaging"
import { useDispatch } from 'react-redux'


const GetToken = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        pushNotification()
    }, [])

    const pushNotification = async () => {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
            console.log("Allow Notifications")
            await getToken(messaging, { vapidKey: "BJ6Zhlt6n6SvJ1vb6ERTdgbdPfa-mQY0_2ojN28VyUAXoNI0TqRdFpZisYdrHz6aHps1f2jnTElAr0FXF4aIJME" })
                .then((currentToken: any) => {
                    if (currentToken) {
                        console.log('currentToken', currentToken);
                    }
                    else {
                        console.log("")
                    }
                }).catch((err: any) => { console.log("err", err) })
        }
        else if (permission === "denied") {
            console.log("Denied Notifications")
        }

    }


    return (
        <div></div>
    )
}

export { GetToken };