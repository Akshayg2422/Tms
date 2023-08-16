import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';

function FileViewer() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
     
    }
  };

  const openFileInNewTab = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      <div>
        <Input type='file' className='form-control' id="file-input" accept='.docx,.pdf,.txt' placeholder="select file" onChange={handleFileUpload} />
        <Button className="btn btn-primary" onClick={openFileInNewTab}>Read File in New Tab</Button>
      </div>
    </div>
  );
}

export { FileViewer };
