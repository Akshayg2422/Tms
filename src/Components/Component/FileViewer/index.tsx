import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { FileUpViwerProps } from './interfaces'
import { translate } from '@I18n';
import { getPhoto } from '@Utils';
import{Image}from '@Components'

function FileViewer({ onChange, onSelect,icons,height,width ,selectedFileUrl}: FileUpViwerProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(selectedFileUrl);

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event,"eeeeeeeeee")
  //   const file = event.target?.files?.[0];
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setFileUrl(url);
  //   }
  // };
  


  const openFileInNewTab = () => {
    if (fileUrl) {
      // console.log(fileUrl,"fileUrl+++")
      // console.log("http://localhost:3000/media/task/file-78b8e502-4a80-404e-857e-0d66d387176a.zip","fileUrl===>")
       window.open(getPhoto(fileUrl), '_blank');
    }
  };
// "/media/task/file-78b8e502-4a80-404e-857e-0d66d387176a.zip"
  return (
    <div >
      <div  onClick={()=>openFileInNewTab()} >
        
        {/* <Input type='file' className='form-control' id="file-input" accept='.docx,.pdf,.txt' placeholder="select file" onChange={handleFileUpload}  style={{display:'none'}}/> */}
        <Image src={icons} height={height} width={width} />
        {/* <Button className="btn btn-primary"
        onClick={()=>openFileInNewTab()} >{translate("common.submit")}</Button> */}
      </div>
    </div>
  );
}

export { FileViewer };


