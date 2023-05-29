import React, { useRef, useState, useLayoutEffect, RefObject } from "react";
import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  showToast,
  Dropzone,
  Image,
} from "@Components";
import { translate } from "@I18n";
import {
  addTicketTag,
  getTicketTag,
} from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { paginationHandler, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP, getPhoto, stringSlice, stringToUpperCase, INITIAL_PAGE } from "@Utils";
import { useModal, useDynamicHeight } from "@Hooks";



function Tag() {
  const dispatch = useDispatch();
  const { ticketTag, ticketTagCurrentPages, ticketTagNumOfPages, } = useSelector((state: any) => state.UserCompanyReducer);
  const dynamicHeight = useDynamicHeight()
  const [showTags, setShowTags] = useState(false);
  const addTagsModal = useModal(false);
  const [tagName, setTagName] = useState("");
  const [tagPhoto, setTagPhoto] = useState("");
  const [tagCode, setTagCode] = useState('');
  const [description, setDescription] = useState("");
  let tagAttach = [tagPhoto]
  let tagPhotoAttach = tagAttach.slice(-1, 4)


  const getTicketTagList = (page_number: number) => {

    const params = {
      page_number
    };

    dispatch(
      getTicketTag({
        params,
        onSuccess: (success: any) => () => {
        },
        onError: (error: string) => () => {
        },
      })
    );
  };

  const addTicketTagApiHandler = () => {

    const params = {
      name: tagName,
      description: description,
      code: tagCode.trim(),
      photo: tagPhotoAttach[0]
    };

    const validation = validate(ADD_TASK_GROUP, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTicketTag({
          params,
          onSuccess: (success: any) => () => {
            addTagsModal.hide()
            showToast(success.message, "success");
            getTicketTagList(INITIAL_PAGE);
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
    return data?.map((el: any) => {
      return {
        name: <div className="row"><div><Image variant={'rounded'} src={getPhoto(el?.photo)} /></div>
          <div className="pt-3 pl-2">{el.name}</div>
        </div>,
        tag: el?.code,

      };
    });
  };

  function resetValue() {
    setTagName("")
    setDescription('')
    setTagPhoto('')
    setTagCode('')
  }




  return (
    <>
      <Card style={{ height: showTags ? dynamicHeight.dynamicHeight - 35 : '5em' }}>
        <div className="row">
          <div className="col">
            <h3>{translate("auth.tag")}</h3>
          </div>
          <div className="text-right mr-3 ">
            <Button
              className={'text-white'}
              text={
                showTags
                  ? translate("course.hide")
                  : translate("course.view")
              }
              size={"sm"}
              onClick={() => {
                setShowTags(!showTags)
                if (!showTags) {
                  getTicketTagList(INITIAL_PAGE);
                }
              }}
            />
            <Button
              className={'text-white'}
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
            marginLeft: "-23px",
            marginRight: "-23px"
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
              className=" h-100 d-flex justify-content-center align-items-center">
              <NoRecordsFound />
            </div>
          )}
        </div>
      </Card>

      <Modal
        isOpen={addTagsModal.visible}
        onClose={() => {
          addTagsModal.hide()
          resetValue()
        }
        }
        title={translate("auth.tag")!}
      >
        <div className="row">
          <div className="col-6">
            <Input
              placeholder={translate("auth.tag")}
              value={tagName}
              onChange={(e) => {
                setTagName(e.target.value)
                setTagCode(stringToUpperCase(stringSlice(e.target.value)))
              }}
            />
          </div>
          <div className="col-6">  <Input
            placeholder={translate("auth.code")}
            value={tagCode}
            onChange={(e) => { setTagCode(stringToUpperCase(stringSlice(e.target.value))) }}
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
              resetValue()
            }
            }
          />
          <Button
            text={translate("common.submit")}
            onClick={addTicketTagApiHandler}
          />
        </div>
      </Modal>
    </>
  )
}

export { Tag }