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

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files && event.target.files.length > 0) {
  //         const file = event.target.files[0];
  //         console.log(event.target.files[0],"event.target.files[0]---------->");

  //         const reader = new FileReader();
  //         console.log(file,"file==============");

  //         reader.onload = (e) => {
  //             console.log(e,"eeeeeeeeeeeeeeeeeee");

  //             new Compressor(file, {
  //                 quality: 0,
  //                 success: (file) => {

  //                     console.log(file,"file");

  //                     console.log(file,"compressedResult");

  //             if (onSelect && e.target) {
  //                 onSelect(e.target?.result);
  //                 setImage(e.target?.result)

  //             }
  //         },
  //     })
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };
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
          {/* <i className="ni ni-spaceship me-2 text-dark opacity-6" onClick={handleRefClick} >{text}</i> */}
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
