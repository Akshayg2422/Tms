import {
  Button,
  Card,
  CommonTable,
  Image,
  ImagePicker,
  Input,
  Modal,
  NoRecordsFound,
  Spinner,
  TextAreaInput,
  showToast
} from "@Components";
import { useDynamicHeight, useInput, useLoader, useModal } from "@Hooks";
import { translate } from "@I18n";
import {
  addTicketTag,
  getTicketTag,
} from "@Redux";
import { ADD_TASK_GROUP, INITIAL_PAGE, capitalizeFirstLetter, getPhoto, getValidateError, ifObjectExist, paginationHandler, stringSlice, stringToUpperCase, validate } from "@Utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function Tag() {
  const dispatch = useDispatch();
  const { ticketTag, ticketTagCurrentPages, ticketTagNumOfPages, } = useSelector((state: any) => state.UserCompanyReducer);
  const dynamicHeight = useDynamicHeight()
  const [showTags, setShowTags] = useState(false);
  const addTagsModal = useModal(false);
  const [tagName, setTagName] = useState("");
  const [tagPhoto, setTagPhoto] = useState("");
  const [tagCode, setTagCode] = useState('');
  const [loading, setLoading] = useState(false)
  // const [description, setDescription] = useState("");
  const description = useInput("");
  const loginLoader = useLoader(false)

  const getTicketTagList = (page_number: number) => {
    setLoading(true)
    const params = {
      page_number
    };

    dispatch(
      getTicketTag({
        params,
        onSuccess: (success: any) => () => {
          setLoading(false)
        },
        onError: (error: string) => () => {
          setLoading(false)
        },
      })
    );
  };

  const addTicketTagApiHandler = () => {

    const params = {
      name: tagName,
      description: description.value,
      code: tagCode.trim(),
      photo: tagPhoto
    };

    const validation = validate(ADD_TASK_GROUP, params)
    if (ifObjectExist(validation)) {
      loginLoader.show()
      dispatch(
        addTicketTag({
          params,
          onSuccess: (success: any) => () => {
            addTagsModal.hide()
            loginLoader.hide()
            showToast(success.message, "success");
            getTicketTagList(INITIAL_PAGE);
            description.set('')

          },
          onError: (error: string) => () => {
            showToast('Tags is already exists');
            loginLoader.hide()

          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));
      loginLoader.hide()
    }
  };

  const normalizedTicketTagData = (data: any) => {
    return data?.map((el: any) => {
      return {
        name:
          <div className="row pl-3">
            <div><Image size={'md'} variant={'rounded'} src={getPhoto(el?.photo)} /></div>
            <div className="pt-3 pl-2">{capitalizeFirstLetter(el.name)}</div>
          </div>,
        tag: el?.code,
      };
    });
  };

  function resetValue() {
    setTagName("")
    description.set('')
    setTagPhoto('')
    setTagCode('')
  }




  return (
    <>
      <div className="card justify-content-center" style={{ height: showTags ? dynamicHeight.dynamicHeight - 35 : '5em' }}>
        <div className="row mx-2">
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
          }}
        >
          {loading && (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px', marginTop: '200px' }}>
              <Spinner />
            </div>
          )}

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
      </div>

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

          <TextAreaInput
            heading={translate('auth.description')!}
            value={description.value}
            onChange={description.onChange}
            className="form-control form-control-sm"

          />
          {/* <Input
            placeholder={translate("auth.description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
        </div>
        {/* <div className="pb-3">
          <Dropzone
            variant="ICON"
            icon={tagPhoto}
            size="xl"
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, "");
              setTagPhoto(encoded);

            }}
          />
        </div> */}
        <div className="ml--2">

          <ImagePicker

            size='xl'
            noOfFileImagePickers={0}
            onSelect={(image) => {
              let file = image.toString().replace(/^data:(.*,)?/, "")
              setTagPhoto(file)
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
            loading={loginLoader.loader}
            onClick={addTicketTagApiHandler}
          />
        </div>
      </Modal>
    </>
  )
}

export { Tag };
