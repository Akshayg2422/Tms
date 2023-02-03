import { FC } from "react";
import { Card, Image } from "@Components";
import { UserStatusCardProps } from "./interface";


const UserStatusCard: FC<UserStatusCardProps> = ({ data = [{}, {}], color = "success" }) => {

    return (
        <>
            <div className={'row'}>
                {data &&
                    data.map((item: any) => {
                        const { heading, percentage, points, month } = item

                        return (
                            <div className={'col-md-6'}>
                                <Card className={`bg-gradient-${color} border-0`}>
                                    <div className={'row'}>
                                        <div className={'col'}>
                                            <h5 className={'text-uppercase text-muted mb-0 text-white'}>
                                                {heading || "Performance"}
                                            </h5>
                                            <span className={'h2 font-weight-bold mb-0 text-white'}>
                                                {percentage || "49,65%"}
                                            </span>
                                        </div>
                                    </div>
                                    <p className={'mt-3 mb-0 text-md'}>
                                        <span className="text-white mr-2">
                                            <i className="fa fa-arrow-up" />
                                            {points || "3.48%"}
                                        </span>
                                        <span className="text-nowrap text-light">
                                            {month || "Since last month"}
                                        </span>
                                    </p>
                                </Card>

                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}
export { UserStatusCard };
