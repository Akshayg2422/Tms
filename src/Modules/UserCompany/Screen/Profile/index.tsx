import { Image, Card, Modal, Button } from "@Components";
import { getPhoto } from '@Utils';
import { useSelector, useDispatch } from "react-redux";
import { useWindowDimensions, useModal, useNavigation } from '@Hooks'
import { getObjectFromArrayByKey, GENDER_LIST, } from '@Utils'
import { userLogout } from '@Redux'
import { ROUTES } from "@Routes"

function Profile() {
  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { company_branch, user_details } = dashboardDetails;
  const { height } = useWindowDimensions()
  const logoutModal = useModal(false)
  const dispatch = useDispatch()
  const { goTo } = useNavigation()

  return (
    <>

      <Card
        title={'Profile'}
        className="m-3" style={{
          height: height
        }}>
        <div>
          <div className="col text-right">
            <Button color={'white'} size={'sm'} text={'Logout'} onClick={logoutModal.show} />
          </div>
          <div className="text-center mb-5">
            {user_details && user_details?.profile_photo && <Image size={'xxl'} variant={'rounded'} src={getPhoto(user_details?.profile_photo)} />}
          </div>

          <h3 className="ct-title undefined">Basic Information</h3>

          <div className="row  mt-4">
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">First Name</h5>
              <h4 className="ct-title">{user_details?.name}</h4>
            </div>
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">Gender</h5>
              <h4 className="ct-title">{getObjectFromArrayByKey(GENDER_LIST, 'id', user_details?.gender).text}</h4>
            </div>
          </div>

          <div className="row  mt-4">
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">Mobile Number</h5>
              <h4 className="ct-title">{user_details?.mobile_number}</h4>
            </div>
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">E-Mail</h5>
              <h4 className="ct-title">{user_details?.email}</h4>
            </div>
          </div>

          <hr></hr>

          <h3 className="ct-title undefined">Company Details</h3>

          <div className="row mt-4">
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">Company</h5>
              <h4 className="ct-title">{company_branch?.name}</h4>
            </div>
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">Designation</h5>
              <h4 className="ct-title">{user_details?.designation}</h4>
            </div>
          </div>
        </div>
      </Card>

      <Modal title={'Are you sure want to Logout?'} size={'md'} isOpen={logoutModal.visible} fade={false} onClose={logoutModal.hide}  >
        <div className='row'>
          <div className="col">
            <Button block text={'NO'} onClick={logoutModal.hide} />
          </div>
          <div className="col">
            <Button block text={'YES'} onClick={() => {
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