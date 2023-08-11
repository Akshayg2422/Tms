import React, { useRef } from 'react'
import { VideoUploaderProps } from './interfaces'
import { ImageIcon } from '@Components';
import { icons } from '@Assets';



function VideoUploader
  ({ onChange, onSelect, }: VideoUploaderProps) {

  const fileInputRef = useRef<any>(null)

  const handleRefClick = () => {
    fileInputRef.current.click();
  };



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {


        if (onSelect && e.target) {

          onSelect(e.target?.result);

          // setImage(e.target?.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <input
        id="file-input"
        type={'file'}
          style={{ display: "none" }}
        ref={fileInputRef}
        accept="video/*"
        onChange={handleChange}
      />

      <ImageIcon
      src={icons.videoPlayer}
      onClick={handleRefClick}
      height={40}
      width={40}

      />

     
    </div>




  
  )
}

export { VideoUploader }
