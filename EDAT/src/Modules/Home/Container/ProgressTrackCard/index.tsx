import { Card, Divider, DragAndReorder, Image, Button, NoRecordsFound, Spinner } from "@Components";
import { title } from "process";
import { FC, useState } from "react";
import {
    Progress
} from "reactstrap";
import { ProgressTrackCardProps } from "./interface";
import { DropDownMenuArrow } from "@Modules"
import { icons } from "@Assets";
import { getImageUrl } from "@Utils";
import { useSelector } from "react-redux";

const ProgressTrackCard: FC<ProgressTrackCardProps> =
    ({ heading, onClick, taskCompletion, headerButton, data, isImage = false, onAddClick, dndData, onSubmitDndClick, isLoading, isDropDownMenuArrow = false, dropDownClick, title, completionRatioText, taskCompletionRatio, isDndModalOpen, dropDownDeleteClick, ClassName }) => {

        const { dashboardDetails, registeredCourses } = useSelector(
            (state: any) => state.DashboardReducer
        );
        console.log("ggggggggggggg", data);

        const filteredDescription = (value: string) => {
            if (value.length > 57) {
                return value.substring(0, 57) + '...';
            }
            else {
                return value
            }
        }
        return (
            <Card isCardBody title={title || 'Course section'} taskCompletionRatio={taskCompletionRatio || '10'} completionRatioText={completionRatioText || '20'}
                buttonText={headerButton || 'Add'} onAddClick={onAddClick}
                isHeaderChildren={
                    <div className={ClassName}>
                        <DragAndReorder
                            title={'Course Section Topic'}
                            dndData={dndData}
                            isDndModalOpen={isDndModalOpen}
                            onSubmitClick={(data) => { if (onSubmitDndClick) onSubmitDndClick(data) }}
                        />

                    </div>
                } style={{ height: '75vh' }}>
                {isLoading &&
                    <div className="mt--6">
                        <Spinner />
                    </div>
                }

                <div className="px-4 mb-4 overflow-auto scroll-hidden" style={{ height: '52vh' }} >
                    {!isLoading && (
                        <div>
                            {data && data?.length > 0 ? data.map((key: any, index: number) => {

                                return (
                                    <>
                                        <div className="row align-items-center">
                                            {isImage && <div className="col-auto" onClick={() => { if (onClick) { onClick(key) } }}>

                                                <Image
                                                    variant={'rounded'}
                                                    alt="..."
                                                    src={key.thumbnail ? key.thumbnail : icons.defaultImage}
                                                />
                                            </div>}
                                            <div className="col" onClick={() => { if (onClick) { onClick(key) } }}>
                                                <h5>{key.name}</h5>
                                                <h6 className="mt--1">{filteredDescription(key.description)}</h6>
                                                <Progress
                                                    className="progress-xs"
                                                    max={`${'30'}`}
                                                    value={`${'20'}`}
                                                    color="warning"
                                                />
                                            </div>
                                            {isDropDownMenuArrow && <DropDownMenuArrow onAddClick={() => { if (dropDownClick) { dropDownClick(key) } }} onDeleteClick={() => { if (dropDownDeleteClick) { dropDownDeleteClick(key) } }} />}
                                        </div>
                                        {(data.length - 1 > index || data.length <= 4) && <Divider />}
                                    </>
                                )
                            }) :
                                <div className=" d-flex justify-content-center align-items-center" style={{ height: '51.5vh' }}>
                                    <NoRecordsFound />
                                </div>
                            }
                        </div>
                    )}
                </div>

            </Card>
        )
    }

export { ProgressTrackCard };
