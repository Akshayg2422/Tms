import { Image, Card, Modal, Button, Dropzone, showToast, ImagePicker, ImageDownloadButton, H, Radio } from "@Components";
import { getPhoto } from '@Utils';
import { useSelector, useDispatch } from "react-redux";
import { useWindowDimensions, useModal, useNavigation } from '@Hooks'
import { getObjectFromArrayByKey, GENDER_LIST, LANGUAGES } from '@Utils'
import { addUpdateEmployeePhoto, getDashboard, setLanguage, userLogout } from '@Redux'
import { ROUTES } from "@Routes"
import { translate } from "@I18n";
import { useEffect } from "react";
import { icons } from "@Assets";


function Profile() {
  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { company_branch, user_details, company } = dashboardDetails || ''
  const logoutModal = useModal(false)
  const languageModal = useModal(false)
  const { language } = useSelector(
    (state: any) => state.AuthReducer
  );

  const dispatch = useDispatch()
  const { goTo } = useNavigation()




  const userProfileEdit = (item: any) => {

    const params = {
      attachment: item
    };

    dispatch(
      addUpdateEmployeePhoto({
        params,
        onSuccess: () => () => {
          showToast('Updated photo successfully');
          getDashboardDetailsApiHandler()
        },
        onError: () => () => {
          showToast('Updated photo failure');
        }
      })
    )

  }


  function getDashboardDetailsApiHandler() {
    const params = {}
    dispatch(getDashboard({
      params,
      onSuccess: () => () => {
      },
      onError: () => () => { }
    }));
  }

  return (
    <>
       
      <Card
        title={translate("common.Profile")}
        className="m-3"
      >
        <div>
          <div className="col text-right">
            <Button color={'white'} size={'sm'} text={translate('common.Logout')} onClick={logoutModal.show} />
            <Button color={'white'} size={'sm'} text={translate('common.Language')} onClick={languageModal.show} />
          </div>


          {user_details && <div className="pb-4">
            <ImagePicker
              size='xxl'
              defaultValue={[{ id: 1, photo: user_details?.profile_photo }]}
              className="text-center"
              noOfFileImagePickers={1}
              imageVariant={'rounded'}
              defaultPicker={true}
              onSelect={(image) => {
                let file = image.toString().replace(/^data:(.*,)?/, "")
                userProfileEdit(file)
              }}
              onSelectImagePicker={() => {
              }}
            />
          </div>
          }


          <h3 className="ct-title undefined">{translate('common.Basic Information')}</h3>

          <div className="row  mt-4">
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">{translate('auth.firstName')}</h5>
              <h4 className="ct-title">{user_details?.name}</h4>
            </div>
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">{translate('auth.gender')}</h5>
              <h4 className="ct-title">{getObjectFromArrayByKey(GENDER_LIST, 'id', user_details?.gender)?.text}</h4>
            </div>
          </div>

          <div className="row  mt-4">
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">{translate('auth.mobileNumber')}</h5>
              <h4 className="ct-title">{user_details?.mobile_number}</h4>
            </div>
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">{translate('auth.email')}</h5>
              <h4 className="ct-title">{user_details?.email}</h4>
            </div>
          </div>

          <hr></hr>
          <div className="text-center mb-5">
            {company && company?.attachment_logo &&
              <Image size={'xxl'} variant={'rounded'} src={getPhoto(company?.attachment_logo)} />}
          </div>

          <h3 className="ct-title undefined">{translate('common.companyDetails')}</h3>

          <div className="row mt-4">
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">{translate('common.company')}</h5>
              <h4 className="ct-title">{company_branch?.name}</h4>
            </div>
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">{translate('auth.designation')}</h5>
              <h4 className="ct-title">{user_details?.designation}</h4>
            </div>
          </div>
        </div>
      </Card>

      <Modal size={'sm'} isOpen={languageModal.visible} fade={false} onClose={languageModal.hide}  >
        <div className="mt--5">
          <H tag={"h4"} text={translate("auth.chooseLanguge")} />
        </div>
        <div className="mt-4 ">
          <Radio
            selected={language}
            selectItem={language}
            data={LANGUAGES}
            onRadioChange={(selected) => {
              if (selected) {
                dispatch(setLanguage(selected));
              }
            }}
          />
        </div>

      </Modal>

      <Modal title={translate("common.Are you sure want to Logout?")!} size={'md'} isOpen={logoutModal.visible} fade={false} onClose={logoutModal.hide}  >
        <div className='row'>
          <div className="col">
            <Button block text={translate("common.No")} onClick={logoutModal.hide} />
          </div>
          <div className="col">
            <Button block text={translate("common.Yes")} onClick={() => {
              dispatch(
                userLogout({
                  onSuccess: () => {
                    goTo(ROUTES["auth-module"].splash, true)
                  },
                  onError: () => {
                    console.log('error');
                  },
                }),
              );
            }} />
          </div>
        </div>
      </Modal>
    </>

  )
}

export { Profile }


