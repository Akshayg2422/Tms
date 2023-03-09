import React, { useState } from 'react';
import { FullScreen, FullScreenHandle } from 'react-full-screen'
import { ImageFullScreen, Image } from '@Components';
import { icons } from '@Assets';

const MyComponent = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreenChange = (state: boolean, handle: FullScreenHandle) => {
        setIsFullScreen(state);
        console.log('state', state);
        if (!state) {
            handle.exit();
        }
    };

    return (
        <div>
            <h1>My Component</h1>
            <ImageFullScreen onChange={handleFullScreenChange}>
                <Image src={icons.addFillGray} alt="My Image" />
            </ImageFullScreen>
            {isFullScreen && <Image src={icons.addFillGray} alt="My Image" />}
        </div>
    );
};

export { MyComponent };

