import React, { useState } from 'react';
import { ImageFullScreen,Image } from '@Components';
import { icons } from '@Assets';

const MyComponent = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = (state: boolean) => {
    setIsFullScreen(state);
  };

  return (
    <div>
      <h1>My Component</h1>
      <ImageFullScreen onChange={handleFullScreenChange}>
        <Image src={icons.addFillGray} alt="My Image" onClick={() => {console.log(handleFullScreenChange);
        }}/>
      </ImageFullScreen>
      {isFullScreen && <Image src={icons.addFillGray} alt="My Image" />}
    </div>
  );
};

export {MyComponent}