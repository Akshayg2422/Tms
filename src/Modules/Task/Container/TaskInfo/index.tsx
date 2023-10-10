import { icons } from "@Assets";
import {
  Alert,
  Back,
  Breadcrumbs,
  Button,
  Card,
  DateTimePicker,
  H,
  Image,
  ImageIcon,
  Input,
  Modal,
  ProfileCard,
  TextAreaInput,
} from "@Components";
import {
  useInput,
  useLoader,
  useModal,
  useNavigation,
  useWindowDimensions,
} from "@Hooks";
import { translate } from "@I18n";
import { TaskEventHistory, TaskItemMenu } from "@Modules";
import {
  addTaskEvent,
  getTaskDetails,
  refreshTaskEvent,
  selectedVcDetails,
} from "@Redux";
import { ROUTES } from "@Routes";
import {
  HDD_MMMM_YYYY_HH_MM_A,
  TASK_EVENT_ETA,
  capitalizeFirstLetter,
  getDates,
  getDisplayDateFromMoment,
  getDisplayDateFromMomentByType,
  getDisplayTimeDateMonthYearTime,
  getMomentObjFromServer,
  getPhoto,
  getServerTimeFromMoment,
  setDataCode,
} from "@Utils";
import { forwardRef, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TaskInfoProps } from "./interfaces";

const START_TASK = 1;
const END_TASK = 2;

const TaskInfo = forwardRef(({ onClick }: TaskInfoProps, ref: any) => {
  const { height } = useWindowDimensions();

  const { id, item } = useParams();
  const { refreshTaskEvents } = useSelector((state: any) => state.TaskReducer);

  const dispatch = useDispatch();
  const { taskDetails } = useSelector((state: any) => state.TaskReducer);

  const { dashboardDetails } = useSelector(
    (state: any) => state.UserCompanyReducer
  );
  const {
    title,
    code,
    description,
    by_user,
    raised_by_company,
    task_attachments,
    assigned_to,
    created_at,
    eta_time,
    start_time,
    end_time,
  } = taskDetails || {};
  const [eta, setEta] = useState(eta_time);
  const editTitle = useInput(title);
  const editDescription = useInput(description);
  const editEtaModal = useModal(false);
  const editEtaReason = useInput("");
  const editTaskModal = useModal(false);
  const taskEventModal = useModal(false);
  const alertModal = useModal(false);
  const [actionTask, setActionTask] = useState<number>();
  const userModal = useModal(false);
  const { goTo } = useNavigation();

  const isAdmin = dashboardDetails?.permission_details?.is_admin
  const isSuperAdmin = dashboardDetails?.permission_details?.is_super_admin

  const showAction = isAdmin || isSuperAdmin

  const loginLoader = useLoader(false);
  const { selectedTaskStatus } = useSelector((state: any) => state.TaskReducer);

  useEffect(() => {
    getTaskDetailsHandler();
  }, [refreshTaskEvents, id]);

  useEffect(() => {
    setEta(eta_time);
  }, [taskDetails]);

  function resetValues() {
    editTitle.set("");
    editDescription.set("");
  }

  const editEtaSubmitApiHandler = () => {
    const params = {
      code: id,
      eta_time: getServerTimeFromMoment(getMomentObjFromServer(eta)),
      event_type: TASK_EVENT_ETA,
      reason: editEtaReason.value,
    };

    dispatch(
      addTaskEvent({
        params,
        onSuccess: () => () => {
          editEtaReason.set("");
          editEtaModal.hide();
          getTaskDetailsHandler();
          dispatch(refreshTaskEvent());
        },
        onError: () => () => { },
      })
    );
  };

  const getTaskDetailsHandler = () => {
    const params = {
      code: id,
    };
    dispatch(
      getTaskDetails({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  };

  function proceedEventTypeApi() {
    const currentTime = getServerTimeFromMoment(
      getMomentObjFromServer(getDates())
    );

    const params = {
      ...(actionTask === START_TASK
        ? { event_type: "ETS", start_time: currentTime }
        : { event_type: "ETE", end_time: currentTime }),
      code: taskDetails?.code,
    };
    dispatch(
      addTaskEvent({
        params,
        onSuccess: (response) => () => {
          alertModal.hide();

          getTaskDetailsHandler();
        },
        onError: () => () => {
          alertModal.hide();
        },
      })
    );
  }

  function editTaskDetailsHandler() {
    const params = {
      code: id,
      title: editTitle.value,
      description: editDescription.value,
      event_type: "TKE",
    };
    loginLoader.show();
    dispatch(
      addTaskEvent({
        params,
        onSuccess: () => () => {
          loginLoader.hide();
          editTaskModal.hide();
          resetValues();
          getTaskDetailsHandler();
          editDescription.set("");
          editTitle.set("");
        },
        onError: () => () => {
          loginLoader.hide();
        },
      })
    );
  }

  return (
    <div>
      <div
        className={"card p-4 overflow-auto overflow-hide "}
        style={{ height: height - 260 }}
      >
        <div className="row justify-content-center">
          <div className="col-auto">
            <Back />
          </div>
          <div className="col">
            {title && (
              <H
                tag={"h4"}
                className="mb-0 bg-white"
                text={capitalizeFirstLetter(title)}
              />
            )}
          </div>

          {item !== "reference-task" && (
            <div
              className="pointer text-right col"
              onClick={() => {
                editTaskModal.show();
                editTitle.set(title);
                editDescription.set(description);
              }}
            >
              {showAction && (
                <ImageIcon src={icons.editEta} height={16} width={16} />
              )}
            </div>
          )}
        </div>

        {description && (
          <div className="text-sm text-muted mt-2">
            {capitalizeFirstLetter(description)}
          </div>
        )}

        <div className="mt-2">
          {
            <PhotoProvider>
              <div className={"pointer"}>
                {task_attachments &&
                  task_attachments.length > 0 &&
                  task_attachments?.map((item: any, index: number) => (
                    <PhotoView src={getPhoto(item?.attachment_file)}>
                      <Image
                        className={index === 0 ? "ml-0" : "ml-2"}
                        variant={"avatar"}
                        size={"lg"}
                        src={getPhoto(item?.attachment_file)}
                      />
                    </PhotoView>
                  ))}
              </div>
            </PhotoProvider>
          }
        </div>

        <div className={"col row justify-content-between"}>
          <div className="row mt-2  pointer ml-1 " onClick={userModal.show}>
            <div className={"align-self-center mr-2"}>
              {by_user?.profile_photo && (
                <Image
                  size={"sm"}
                  variant={"rounded"}
                  src={getPhoto(by_user?.profile_photo)}
                />
              )}
            </div>
            <div className={"align-self-center"}>
              <div className="h5 mb-0"> {by_user?.name}</div>
            </div>
          </div>
          <div className="row mt-3 mr-3">
            <div className={"align-self-center "}>
              {raised_by_company?.attachment_logo && (
                <Image
                  variant={"rounded"}
                  size={"sm"}
                  src={getPhoto(raised_by_company?.attachment_logo)}
                />
              )}
            </div>
            <div className="align-self-center">
              <div className="h5 mb-0 ml-2">
                {" "}
                {raised_by_company?.display_name}
              </div>
              {assigned_to?.name !== undefined && (
                <div className="text-xs ml-2">
                  <span>{`@ ${assigned_to?.name}`} </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="my-3 mx-0" />

        {item !== "reference-task" && (
          <div className="row mt-2">
            <div className="col">
              {eta_time ? (
                <>
                  <H
                    className="mb-0 text-uppercase text-muted "
                    tag={"h6"}
                    text={"ETA :"}
                  />
                  <h5 className="text-uppercase">
                    {getDisplayDateFromMomentByType(
                      HDD_MMMM_YYYY_HH_MM_A,
                      getMomentObjFromServer(eta_time)
                    )}
                  </h5>
                </>
              ) : (
                <>
                  <H
                    className=" text-uppercase text-muted "
                    tag={"h6"}
                    text={"CREATED AT :"}
                  />
                  <h5 className="text-uppercase mt--2">
                    {getDisplayDateFromMoment(
                      getMomentObjFromServer(created_at)
                    )}
                  </h5>
                </>
              )}
            </div>

            <div className="col-auto">
              <div className="row">
                <div className="pointer" onClick={() => editEtaModal.show()}>
                  {showAction && (
                    <ImageIcon src={icons.editEta} height={16} width={16} />
                  )}
                </div>
                <div
                  className="ml-3 pointer"
                  onClick={() => {
                    taskEventModal.show();
                  }}
                >
                  <ImageIcon src={icons.timeline} height={17} width={17} />
                </div>
                <div className="ml-2 pointer">
                  {showAction &&
                    <TaskItemMenu />
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {item !== "reference-task" && (
          <div className="col text-right ml-3">
            {assigned_to?.id === dashboardDetails?.user_details?.id &&
              !start_time && (
                <Button
                  className={"text-white"}
                  size={"sm"}
                  text={"Start"}
                  onClick={() => {
                    alertModal.show();
                    setActionTask(START_TASK);
                  }}
                />
              )}
            {assigned_to?.id === dashboardDetails?.user_details?.id &&
              start_time &&
              !end_time && (
                <Button
                  className={"text-white"}
                  size={"sm"}
                  text={"mark as Closed"}
                  onClick={() => {
                    alertModal.show();
                    setActionTask(END_TASK);
                  }}
                />
              )}
          </div>
        )}
      </div>

      {/**
       * Edit Eta Modal
       */}
      <Modal
        title={translate("auth.Edit eta time")!}
        isOpen={editEtaModal.visible}
        onClose={() => {
          editEtaModal.hide();
          resetValues();
        }}
        size={"md"}
      >
        <Input
          type={"text"}
          heading={translate("common.note")}
          value={editEtaReason.value}
          onChange={editEtaReason.onChange}
        />

        <DateTimePicker
          heading={"ETA"}
          initialValue={getDisplayTimeDateMonthYearTime(
            getMomentObjFromServer(eta)
          )}
          type="both"
          onChange={setEta}
        />

        <div className="col text-right">
          <Button
            text={translate("order.Update")}
            onClick={editEtaSubmitApiHandler}
          />
        </div>
      </Modal>

      {/**
       * show Event Time Line
       */}
      <Modal
        title={translate("auth.Latest Events")!}
        size={"lg"}
        isOpen={taskEventModal.visible}
        onClose={taskEventModal.hide}
      >
        <TaskEventHistory />
      </Modal>

      <Modal
        size={"md"}
        title={translate("auth.Edit task Details")!}
        isOpen={editTaskModal.visible}
        onClose={editTaskModal.hide}
      >
        <Input
          type={"text"}
          heading={translate("common.title")}
          value={editTitle.value}
          onChange={editTitle.onChange}
        />
        <div>
          <TextAreaInput
            heading={translate("auth.description")!}
            value={editDescription.value}
            onChange={editDescription.onChange}
            className="form-control form-control-sm"
          />
        </div>

        <div className="text-right pt-3">
          <Button
            text={translate("order.Update")}
            loading={loginLoader.loader}
            onClick={editTaskDetailsHandler}
          />
        </div>
      </Modal>

      <Modal size={"sm"} isOpen={userModal.visible} onClose={userModal.hide}>
        <ProfileCard
          coverPhoto={by_user?.profile_photo}
          profilePhoto={by_user?.profile_photo}
          name={by_user?.name}
          department={by_user?.department?.name}
          designation={by_user?.designation?.name}
          company={raised_by_company?.display_name}
          userId={by_user?.id}
          messageOnClick={() => {
            dispatch(selectedVcDetails(by_user));
            goTo(ROUTES["user-company-module"]["individual-chat"], false);
          }}
        />
      </Modal>

      <Alert
        size="md"
        title="Are you sure want to start the task?"
        isOpen={alertModal.visible}
        onClose={alertModal.hide}
        primaryOnClick={proceedEventTypeApi}
        secondaryOnClick={alertModal.hide}
      />
    </div>
  );
});
export { TaskInfo };
