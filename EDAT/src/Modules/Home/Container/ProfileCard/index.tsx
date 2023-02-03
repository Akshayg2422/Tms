import { Card } from "@Components";
import { ProfilePicture } from "@Modules";
import { FC } from "react";
import { ProfileCardProps } from "./interface";

const ProfileCard: FC<ProfileCardProps> = ({ data = {} }) => {
    const { bgImage, photo, name, age, location, designation, officeName } = data
    return (
        <>
            <Card className="card-profile">
                <ProfilePicture />
                <div className="pt-7">
                    <div className="text-center">
                        <h5 className="h3">
                            {name || 'Jessica Jones'}
                            <span className="font-weight-light">{`, ${age || '27'}`}</span>
                        </h5>
                        <div className="h5 font-weight-300">
                            <i className="ni location_pin mr-2" />
                            {location || 'Bucharest, Romania'}
                        </div>
                        <div className="h5 mt-4">
                            <i className="ni business_briefcase-24 mr-2" />
                            {designation || 'Solution Manager - Creative Tim Officer'}
                        </div>
                        <div>
                            <i className="ni education_hat mr-2" />
                            {officeName || 'University of Computer Science'}
                        </div>
                    </div>
                </div>
            </Card>

        </>
    );
}

export { ProfileCard };

