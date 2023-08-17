import React, { useRef, useState } from 'react'
import { FileUploaderProps } from './interfaces'
import { Button, ImageIcon } from '@Components';
import { icons } from '@Assets';



function FileUploader
  ({ onChange, onSelect,fileType }: FileUploaderProps) {

  const fileInputRef = useRef<any>(null)
  const [fileUpload,setFileUpload]=useState<any>()
  
  const handleRefClick = () => {
    fileInputRef.current.click();
    // console.log('999999999999',fileInputRef);
    
  };



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event====>",event)
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
     console.log("file==>",file.name)
     fileType( file.name.slice(-3))
     

      const reader = new FileReader();

      reader.onload = (e) => {


        if (onSelect && e.target) {

          onSelect(e.target?.result);
        
          setFileUpload(e.target?.result);
        }
      };
      reader.readAsDataURL(file);
      
    }
    console.log('44444444444444',handleChange);
    
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

      <Button
      color={'white'} size={'lg'} className='ml-3'
      variant={'icon-rounded'} icon={icons.Files}
      onClick={handleRefClick}
      height={50}
      width={50}
      />
    </div>

  )
}

export { FileUploader }
