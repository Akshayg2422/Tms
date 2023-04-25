import { useEffect, useState } from "react";
import {
    Comments,
    TaskUsers,
    TaskAttachments,
    ReferenceTasks,
    SubTaskListing,
    TaskInfo,
} from "@Modules";
import { Button, Card, H, HomeContainer, Tabs } from "@Components";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { useSelector } from "react-redux";

function TaskDetails() {




    return (
        <HomeContainer className="m-3">
            <div className="row">
                <div className="col-md-7">
                    <TaskInfo />
                </div>
                {/* <div className="col-4">
                        <Card className="overflow-auto overflow-hide mt-3 mr--3" style={{ height: '58vh' }}>
                            <div className="row mt--2">
                                <div className="col m-0 p-0">
                                    <H tag={'h5'} text={'SUB TASKS'} />
                                </div>

                                <div className={'col text-right mt--2 m-o p-0'}>
                                    <Button
                                        style={{ padding: '3px 3px' }}
                                        size={"sm"}
                                        text={translate('common.addNew')}
                                        onClick={() => {
                                            goTo(HOME_PATH.ADD_SUB_TASK);
                                        }}
                                    />
                                </div>
                            </div>

                            <Card className={'overflow-auto overflow-hide container shadow-none'} style={{ height: '50vh' }}><SubTaskListing /></Card>

                        </Card>
                    </div> */}
            </div>
            {/* <div className="row">
                    <div className="col mt--3">
                        <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
                    </div>
                </div> */}


        </HomeContainer>
    );
}

export { TaskDetails };
