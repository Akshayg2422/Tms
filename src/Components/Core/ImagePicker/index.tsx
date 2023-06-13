import React, { useEffect, useRef, useState } from "react";
import { Image, InputHeading } from "@Components";
import { icons } from "@Assets";
import { DropZoneImageProps } from "./interfaces";
import Compressor from "compressorjs";
import { imagePickerConvertBase64 } from "@Utils";
const ImagePicker = ({
  onSelect,
  size = "lg",
  imageVariant = 'avatar',
  noOfFileImagePickers,
  defaultValue,
  className = 'row',
  heading,
  onSelectImagePickers,
  onSelectImagePicker,
  defaultPicker = false
}: DropZoneImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [count, setCount] = useState(1)
  const initialValue = { id: 0, base64: icons.addFillSquare, base111: icons.addFillSquare }
  const [photo, setPhoto] = useState<any>()

  const updatedProfile = photo && photo.filter((element: any) => element.id !== 0)

  useEffect(() => {

    if (defaultValue && defaultPicker) {
      imagePickerConvertBase64(defaultValue)
        .then((result) => {

          if (defaultValue > 1) {
            setPhoto([...result, initialValue]) 
    
          }
          else {
            setPhoto([...result])
         

          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else {
      setPhoto([initialValue])
    }

  }, []);

  if (photo) {
    onSelectImagePicker(updatedProfile)
  }


  const handleRefClick = (el) => {
    console.log(fileInputRef)
    fileInputRef?.current?.click();

    if (el.id > 0) {

      setCount(el.id)

    }


  }

  //we have to this for edit
  const imagePickers = (value: any) => {
    const updatedSelectedImage = [...photo];
    const updatedImageArray = updatedSelectedImage.filter((filterItem: any) => filterItem.id !== value.id);
    setCount(value.id)

    setPhoto(updatedImageArray);
  

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // const reader = new FileReader();
      let updatedPhoto

      new Compressor(file, {
        quality: 0.6,
        success: (file) => {
          const reader = new FileReader();
          reader.onload = (e) => {

            if (onSelect && e.target) {
              onSelect(e.target?.result);

              updatedPhoto = { id: count, base64: e.target?.result }

              let updatedSelectedPhotos: any = [...photo];

              //no of length=-
              if (updatedSelectedPhotos.length > noOfFileImagePickers) {
                updatedSelectedPhotos = updatedSelectedPhotos.filter(
                  (filterItem: any) => filterItem.id !== 0
                );
                setPhoto(updatedSelectedPhotos)

              }
              const ifExist = updatedSelectedPhotos.some(
                (el: any) => el.id === updatedPhoto?.id
              );

              ///remove the edit image  entre fixe new image
              if (ifExist) {

                updatedSelectedPhotos = updatedSelectedPhotos.filter(
                  (filterItem: any) => filterItem.id !== updatedPhoto?.id
                );
                updatedSelectedPhotos = [{ id: updatedPhoto?.id, base64: e.target?.result }, ...updatedSelectedPhotos]
                setCount(photo.length + 1 - 1)
                onSelectImagePickers(updatedSelectedPhotos)

              }


              ///without add new image
              else {
                setCount(count + 1)
                updatedSelectedPhotos = [updatedPhoto, ...updatedSelectedPhotos]

              }

              setPhoto(updatedSelectedPhotos)

            }

          };
          reader.readAsDataURL(file);

        },
      });
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
      <div className="col-12 pt-2"><InputHeading heading={heading} /></div>
      {photo && photo.map((el, index) => {

        return (

          <div className={`${className} col-auto ml-0  pr-3`}>
            <div >
              <div >
                <Image
                  src={photo[index]?.base64}
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

        )

      })

      }

    </>


  );
};

export { ImagePicker };


