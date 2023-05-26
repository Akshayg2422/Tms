import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Button } from '@Components//Core';
import { DownloadImageProps } from './interfaces';

function ImageDownloadButton ({ 
    Url,...rest }:DownloadImageProps) {

    const handleDownload = async () => {
      try {
        const response = await axios.get(Url, {
          responseType: 'blob'
        });
        saveAs(response.data);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    };
  
    return (
      <Button onClick={handleDownload} className="fa fa-download mt-1" size={'sm'} >
      </Button>
    );
  };

  export  {ImageDownloadButton};