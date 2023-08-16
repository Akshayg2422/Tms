import React, { useRef, useState } from 'react'
import { FileUploaderProps } from './interfaces'
import { ImageIcon } from '@Components';
import { icons } from '@Assets';



function FileUploader
  ({ onChange, onSelect, }: FileUploaderProps) {

  const fileInputRef = useRef<any>(null)
  const [fileUpload,setFileUpload]=useState<any>()
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
        
          setFileUpload(e.target?.result);
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
        accept="file/*"
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

export { FileUploader }
