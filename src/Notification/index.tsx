import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './Firebase';

const Notification = () => {
    // const [notification, setNotification] = useState({ title: '', body: '' });

    requestForToken();

    onMessageListener()
        .then((payload: any) => {
            console.log("foreground message", payload);
            const title = payload?.data?.title;
            const options = {
                body: payload?.data?.message,
            };

            // new Notification(title, options).addEventListener('click', function () {
            //     // this.close()
            // });

            console.log("---------->", options, title);


        })
        .catch((err: any) => console.log('failed: ', err));

    return (
        <Toaster />
    )
}

export { Notification }