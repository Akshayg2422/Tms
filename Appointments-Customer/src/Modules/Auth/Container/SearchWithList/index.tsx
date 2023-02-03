import React from "react";
import { Card, Image, Heading } from '@Components'
import { SearchWithListProps } from "./interface"
const SearchWithList = ({ image, title, subtitle, alt }: SearchWithListProps) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-6" >
          <Card>
            <div className="row">
              <div className="col-lg-2 col-md-5 col-sm-12">
                <Image size={'lg'} variant={'rounded'} src={image} className="ml-3" width={"80px"} height={"80px"} alt={alt} />
              </div>
              <div className="col-auto col-md-7 col-sm-12">
                <div className="text-uppercase">
                  <Heading heading={title} variant={"h1"} />
                </div>

                <Heading heading={subtitle} variant={"h4"} />

              </div>
            </div>
          </Card>
        </div>
      </div>

    </>
  );


}

export { SearchWithList }