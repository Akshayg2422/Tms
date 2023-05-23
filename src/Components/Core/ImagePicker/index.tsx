import React, { useEffect, useRef, useState } from "react";
import { Image } from "@Components";
import { icons } from "@Assets";
import { DropZoneImageProps } from "./interfaces";
import Compressor from "compressorjs";


const ImagePicker = ({
  onSelect,
  text,
  icon,
  size = "lg",
  imageVariant = 'avatar',
  noOfFilePickers = 3,
  editImagePicker = false,
  defaultValue
}: DropZoneImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);


  const [count, setCount] = useState(1)

  const initialValue = { id: 0, base64: icons.addFillSquare ,base111: icons.addFillSquare }
  const imagePicker:any=defaultValue && [...defaultValue,initialValue]
  console.log(imagePicker,"pppppppppppppppp")
  const [photo, setPhoto] = useState<any>()
  
  useEffect(()=>{
    setPhoto(imagePicker)

  },[defaultValue])

  const handleRefClick = (el) => {
    console.log(fileInputRef)
    fileInputRef?.current?.click();
    if (el.id > 0) {
      setCount(el.id)

    }

  }
  const imagePickers = (value: any) => {
    const updatedSelectedImage = [...photo];
    const updatedImageArray = updatedSelectedImage.filter((filterItem: any) => filterItem.id !== value.id);
    setPhoto(updatedImageArray);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      let updatedPhoto
      reader.onload = (e) => {

        if (onSelect && e.target) {
          onSelect(e.target?.result);

          updatedPhoto = { id: count, base64: e.target?.result }

          let updatedSelectedPhotos: any = [...photo];
          const ifExist = updatedSelectedPhotos.some(
            (el: any) => el.id === updatedPhoto?.id
          );
          if (ifExist) {
            updatedSelectedPhotos = updatedSelectedPhotos.filter(
              (filterItem: any) => filterItem.id !== updatedPhoto?.id
            );
            updatedSelectedPhotos = [{ id: updatedPhoto?.id, base64: e.target?.result }, ...updatedSelectedPhotos]

          }
          else {
            setCount(count + 1)
            updatedSelectedPhotos = [updatedPhoto, ...updatedSelectedPhotos];
          }

          setPhoto(updatedSelectedPhotos)

        }
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept="image/*"
      />
      {photo&&photo.map((el, index) => {

        return (
          <>
            <div className="row col-auto pt-2 pr-3">
              <div >
                <div >
                  <Image
                    src={imagePicker[index]?.base111}
                    variant={imageVariant}
                    onClick={() => handleRefClick(el)}
                    size={size}
                    style={{ backgroundColor: "#e3e5e8" }}
                  />
                </div>
              </div>
              {index !== photo.length - 1 && (
                <div
                  className="justify-content-top"
                  style={{ marginLeft: "-13px", marginTop: "-7px" }}
                  onClick={() => imagePickers(el)}
                >
                  <div
                    className="text-center"
                    style={{
                      width: "21px",
                      height: "21px",
                      borderRadius: "16px",
                      backgroundColor: "#d7d8d9"
                    }}
                  >
                    <i
                      className="bi bi-trash text-black text-sm"
                    ></i>
                  </div>
                </div>
              )}
      

            </div>
          </>
        )

      })

      }

    </>


  );
};

export { ImagePicker };


