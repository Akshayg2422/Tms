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
      // const maxSizeInBytes = 1024 * 1024 * 25;
      // console.log(file.size,"---------->")
      // console.log(maxSizeInBytes,"maxSizeInBytes===>")

      // if (file.size > maxSizeInBytes) {
      //   // You can display an error message or take appropriate action here
      //   console.log('Uploaded video exceeds size limit');
      //   return;
      // }

      const reader = new FileReader();

      reader.onload = (e) => {


        if (onSelect && e.target) {

          onSelect(e.target?.result);
          console.log(e.target?.result,"eeeeeeeeeeeeee")

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
