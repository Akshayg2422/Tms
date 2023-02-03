import React from "react";
import { CardProps } from "./interfaces";
import {
  Card as RsCard,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
} from "reactstrap";
import { Button, Spinner } from "@Components";

function Card({
  title,
  children,
  taskCompletionRatio,
  isCardBody = false,
  completionRatioText,
  isCardFooter = false,
  footerChildren,
  isHeaderChildren,
  isLoading = false,
  onAddClick,
  Class,
  buttonText,
  ...rest
}: CardProps) {
  return (
    <RsCard {...rest}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          {title && (
            <CardTitle>
              <CardHeader>
                <div className="row">
                  <div className="col-sm-7">
                    <h5 className="h3 mb-0">{title}</h5>
                    {taskCompletionRatio && (
                      <h6 className="text-muted ls-1">{`${taskCompletionRatio} ${completionRatioText}`}</h6>
                    )}
                  </div>
                  <div className="col">
                  <div className="float-right d-flex">
                    {isHeaderChildren && (
                      <div className="">{isHeaderChildren}</div>
                    )}
                    {buttonText && (
                      <div className="">
                        <Button
                          className="btn float-right"
                          color="primary"
                          href="#pablo"
                          onClick={onAddClick}
                          size="sm"
                          text={buttonText}
                        />
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              </CardHeader>
            </CardTitle>
          )}

          {!isCardBody ? (
            <CardBody>{children}</CardBody>
          ) : (
            <div>{children}</div>
          )}
          {isCardFooter && <CardFooter>{footerChildren}</CardFooter>}
        </>
      )}
    </RsCard>
  );
}

export { Card };
