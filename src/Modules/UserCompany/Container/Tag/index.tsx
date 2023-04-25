import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  showToast,
  Checkbox,
  Dropzone,
  Image,
  MenuBar,
  DateTimePicker
} from "@Components";
import { translate } from "@I18n";
import {

  addTicketTag,

  getTicketTag,

} from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP, getPhoto, ADD_SUB_TASK_GROUP } from "@Utils";
import { useModal, useDynamicHeight } from "@Hooks";


function Tag() {


  const dispatch = useDispatch();


  const {
    departmentData,
    designationData,

    ticketTag,

    ticketTagCurrentPages,
    ticketTagNumOfPages,

  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );


  const [photo, setPhoto] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [addSubPhoto, setAddSubPhoto] = useState("");
  const [tagPhoto, setTagPhoto] = useState("");

  const [showTags, setShowTags] = useState(false);

  const addTagsModal = useModal(false);

  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");



  const [TagCodeFill, setTagCodeFill] = useState(tags.slice(0, 3).toUpperCase());

  const [startTimeEta, setStatTimeEta] = useState("")
  const [endTimeEta, setEndTimeEta] = useState("")
  const startDate = new Date(startTimeEta)
  const startTime = startDate.getHours()

  const dynamicHeight: any = useDynamicHeight()


  let tagAttach = [tagPhoto]
  let tagPhotoAttach = tagAttach.slice(-1, 4)

  const getTicketTagList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber
    };

    dispatch(
      getTicketTag({
        params,
        onSuccess: (success: any) => () => {

          if (!showTags) {

            setShowTags(!showTags)
          }
        },
        onError: (error: string) => () => {
        },
      })
    );
  };

  const addTicketTagAdding = () => {
    const params = {
      name: convertToUpperCase(tags),
      description: convertToUpperCase(description),
      code: TagCodeFill,
      photo: tagPhotoAttach[0]
    };
    const validation = validate(ADD_TASK_GROUP, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTicketTag({
          params,
          onSuccess: (success: any) => () => {
            addTagsModal.hide()

            dispatch(
              getTicketTag({
                params,
                onSuccess: (success: any) => () => {

                  setDescription("")
                  setTagPhoto("")
                  setTagCodeFill("")
                  setTags("")

                },
                onError: (error: string) => () => { },
              })
            );

            showToast(success.message, "success");
          },
          onError: (error: string) => () => {
            showToast('Tags is already exists');

          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));

    }
  };

  const normalizedTicketTagData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: <div className="row"><div><Image variant={'rounded'} src={getPhoto(el?.photo)} /></div>
          <div className="pt-3 pl-2">{el.name}</div>
        </div>,
        tag: el?.code,

      };
    });
  };


  return (
    <div>
      <>
        <Card style={{ height: showTags ? dynamicHeight.dynamicHeight - 35 : '5em' }}>
          <div className="row">
            <div className="col">
              <h3>{translate("auth.tags")}</h3>
            </div>
            <div className="text-right mr-3 ">
              <Button
                text={
                  showTags
                    ? translate("course.hide")
                    : translate("course.view")
                }
                size={"sm"}
                onClick={() => {
                  if (!showTags) {
                    getTicketTagList(ticketTagCurrentPages);
                  } else {
                    setShowTags(!showTags)
                  }

                }}
              />
              <Button
                text={translate("product.addItem")}
                size={"sm"}
                onClick={() => { addTagsModal.show() }}
              />
            </div>
          </div>


          <div
            className="overflow-auto overflow-hide"
            style={{
              height: showTags ? dynamicHeight.dynamicHeight - 100 : '0px',
              margin: '0px -39px 0px -39px'
            }}
          >
            {ticketTag && ticketTag?.length > 0 ? (
              <CommonTable
                isPagination
                tableDataSet={ticketTag}
                displayDataSet={normalizedTicketTagData(ticketTag)}
                noOfPage={ticketTagNumOfPages}
                currentPage={ticketTagCurrentPages}
                paginationNumberClick={(currentPage) => {

                  getTicketTagList(paginationHandler("current", currentPage));

                }}
                previousClick={() => {
                  getTicketTagList(paginationHandler("prev", ticketTagCurrentPages))
                }
                }
                nextClick={() => {
                  getTicketTagList(paginationHandler("next", ticketTagCurrentPages));
                }
                }
              />
            ) : (
              <div
                className=" d-flex justify-content-center align-items-center"
                style={{
                  height: "30.5rem",
                }}
              >
                <NoRecordsFound />
              </div>
            )}
          </div>
        </Card>

        <Modal
          isOpen={addTagsModal.visible}
          onClose={() => {
            addTagsModal.hide()
            setTags("")
            setDescription('')
            setTagPhoto('')
            setTagCodeFill('')
          }
          }
          title={translate("auth.tags")!}
        >

          <div className="row">
            <div className="col-6">
              <Input
                placeholder={translate("auth.tags")}
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value)
                  setTagCodeFill(e.target.value.slice(0, 3).toUpperCase())
                }}
              />
            </div>
            <div className="col-6">  <Input
              placeholder={translate("auth.code")}
              value={TagCodeFill}
              onChange={(e) => { setTagCodeFill(e.target.value.slice(0, 3).toUpperCase()) }}
            />
            </div>
          </div>
          <div>
            <Input
              placeholder={translate("auth.description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="pb-3">
            <Dropzone
              variant="ICON"
              icon={tagPhoto}
              size="xl"
              onSelect={(image) => {
                let encoded = image.toString().replace(/^data:(.*,)?/, "");
                setTagPhoto(encoded);

              }}
            />
          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => {
                addTagsModal.hide()
                setTags("")
                setDescription('')
                setTagPhoto('')
                setTagCodeFill('')
              }
              }
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                addTicketTagAdding();
              }}
            />
          </div>
        </Modal>
      </>


    </div>
  )
}

export { Tag }