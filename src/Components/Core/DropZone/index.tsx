import React, { useRef, useState } from "react";
import { Image } from "@Components";
import { icons } from "@Assets";
import { DropZoneProps } from "./interfaces";
import Compressor from "compressorjs";

const Dropzone = ({
  onSelect,
  variant = "BUTTON",
  text,
  icon,
  size = "lg",
}: DropZoneProps) => {
  const fileInputRef = useRef<any>();
  const [image, setImage] = useState<any>(icon);
  const handleRefClick = () => {
    fileInputRef.current.click();
  };

    
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      new Compressor(file, {
        quality: 0.7,
        success: (file) => {
          const reader = new FileReader();
        
          reader.onload = (e) => {
            if (onSelect && e.target) {
             
              onSelect(e.target?.result);
              setImage(e.target?.result);
            }
          };
          reader.readAsDataURL(file);
        },
      });
    }
  };

  return (
    <>
      {variant === "BUTTON" && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChange}
            accept="image/*"
          />
          <button onClick={handleRefClick}>{text && text}</button>
        </>
      )}
      {variant === "ICON" && (
        <>
          {" "}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChange}
            accept="image/*"
          />
          
          <Image
            src={image || icons.addFillSquare}
            variant="avatar"
            onClick={handleRefClick}
            size={size}
          />
        </>
      )}
    </>
  );
};

export { Dropzone };
