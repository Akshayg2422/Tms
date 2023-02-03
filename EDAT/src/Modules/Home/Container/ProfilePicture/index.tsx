import { Images } from "@Assets";
import { Button, Card, } from "@Components";
import { FC } from "react";
import { CardBody, CardImg } from "reactstrap";
import { ProfilePictureProps } from "./interface";

const ProfilePicture: FC<ProfilePictureProps> = ({ bgImage, photo, children, onClick }) => {
    return (
        <>
            <div className="mt--4 mx--4">
                <CardImg
                    alt="..."
                    src={bgImage || Images.rainForest}
                    top
                    height={'250vh'}

                />
                <div className="row justify-content-center">
                    <div className="order-lg-2 col-lg-3" >
                        <div className="card-profile-image">
                            <a href="#pablo" onClick={onClick}>
                                <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={photo || Images.angular}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { ProfilePicture };

