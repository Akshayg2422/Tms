import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, CommonTable, Image, MenuBar, Dropzone, Modal } from '@Components'
import { getEmployees, addUpdateEmployeePhoto } from '@Redux'
import { useModal, useNavigation } from '@Hooks'
import { HOME_PATH } from '@Routes'
import { translate } from "@I18n";
import { getPhoto, } from "@Utils";
import { icons } from '@Assets'


function CompanyUsers() {

  const { goTo } = useNavigation()
  const dispatch = useDispatch()

  const { employees, selectedCompany } = useSelector((state: any) => state.UserCompanyReducer);


  const editProfileModal = useModal(false);
  const [editPhoto, setEditPhoto] = useState("");
  const [photo, setPhoto] = useState("");
  let attach = [photo]
  let userProfile = attach.slice(-1, 4)

  const USER_MENU = [
    { id: '0', name: "Edit", icon: icons.edit },
  ]


  const userProfileEdit = () => {

    const params = {
      attachment: userProfile[0]
    };

    dispatch(
      addUpdateEmployeePhoto({
        params,
        onSuccess: () => () => {
          getCompanyEmployeesApi()
          editProfileModal.hide()
        },
        onError: () => () => {
          editProfileModal.hide()
        }
      })
    )


  }


  useEffect(() => {
    getCompanyEmployeesApi()
  }, []);



  function getCompanyEmployeesApi() {

    const params = { branch_id: selectedCompany.branch_id };
    dispatch(getEmployees({
      params,
      onSuccess: () => () => {
      },
      onError: () => () => { }
    }));
  }

  const normalizedTableData = (data: any) => {
    return data?.map((el: any) => {
      return {
        name: el.name,
        profile: el?.profile_image && <Image variant={'rounded'} src={getPhoto(el?.profile_image)} />,
        phone: el?.mobile_number,
        email: el?.email,
        "": <MenuBar menuData={USER_MENU} onClick={(el) => {
          if (el.id === USER_MENU[0].id) {
            editProfileModal.show()
            setEditPhoto(el?.profile_image)
          }
        }} />
      };
    });
  };

  return (
    <div>
      <div className='text-right mt--3'>
        <Button text={translate('common.addUser')} size={'sm'} onClick={() => { goTo(HOME_PATH.ADD_USER) }} />
      </div>
      <div className='mx--3 mt-3'>
        <CommonTable card title='User' tableDataSet={employees} displayDataSet={normalizedTableData(employees)} />
      </div>

      <Modal
        isOpen={editProfileModal.visible}
        onClose={() => {
          editProfileModal.hide()
        }}
        title={translate("auth.task")!}
      >

        <div className="pb-3">
          <Dropzone
            variant="ICON"
            icon={getPhoto(editPhoto)}
            size="xl"
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, "");
              setPhoto(encoded);
            }}
          />
        </div>
        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={() => {
              userProfileEdit();
            }}
          />
        </div>
      </Modal>
    </div>
  )
}
export { CompanyUsers }