import React, { useState, useRef } from 'react';

function VideoPlayer  ()  {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<any>(null);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <video
                ref={videoRef}
                width="100%"
                height="100%"
                controls
            >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
            <button onClick={togglePlay}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    )
}

export { VideoPlayer};