import React from 'react'
import { useEffect, useState } from "react"
import { Button, Form, Input } from "reactstrap"
// import FileViewer from 'react-file-viewer';
// import FileSaver from "file-saver";

function DocxView() {
 
  const [docxFile, setDocxFile] = useState<any>("")
  const [viewFile, setViewFile] = useState<any>("")
  const [fileName, setFileName] = useState<string>()

  const handleFileUpload = (event) => {
    setFileName(event.target?.files[0].name)
    setDocxFile(URL.createObjectURL(event.target?.files[0]))
    setViewFile("")
  }
  console.log("docxfile", docxFile)
  const handleReadContent = () => {
    setViewFile(docxFile)
    setDocxFile("")
  };
 
  const handleUpdateContent:any = (e) => {
    // FileSaver.saveAs(e.target.value,fileName);
  }
  //  let newWindow:any = window.open() //the file will open in new window
  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      {/* <div >
        <Input type='file' className='form-control' id="file-input" accept='.docx' placeholder="selecte file" onChange={handleFileUpload} />
        <Button className="btn btn-primery" onClick={handleReadContent}>Read File</Button>
        <Button className="btn btn-primery" value={viewFile} onClick={handleUpdateContent}>updatedContent</Button>
      </div>
      {viewFile && <FileViewer fileType={"docx"} filePath={viewFile} />} */}
    </div>
  )




 }
export { DocxView }