import { Image, Card, Modal, Button, Dropzone, showToast, ImagePicker } from "@Components";
import { getPhoto } from '@Utils';
import { useSelector, useDispatch } from "react-redux";
import { useWindowDimensions, useModal, useNavigation } from '@Hooks'
import { getObjectFromArrayByKey, GENDER_LIST, } from '@Utils'
import { addUpdateEmployeePhoto, getDashboard, userLogout } from '@Redux'
import { ROUTES } from "@Routes"

function Profile() {
  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { company_branch, user_details, company } = dashboardDetails || ''
  const { height } = useWindowDimensions()
  const logoutModal = useModal(false)
  const dispatch = useDispatch()
  const { goTo } = useNavigation()


  console.log(JSON.stringify(dashboardDetails) + '====dashboardDetails');



  const userProfileEdit = (item) => {


    const params = {
      attachment: item
    };

    dispatch(
      addUpdateEmployeePhoto({
        params,
        onSuccess: () => () => {
          showToast('Updated photo successfully');

          const params = {}
          dispatch(getDashboard({
            params,
            onSuccess: (response) => () => {


            },
            onError: () => () => { }
          }));

        },
        onError: () => () => {
          showToast('Updated photo failure');

        }
      })
    )


  }

  return (
    <>

      <Card
        title={'Profile'}
        className="m-3"
      //  style={{
      //   height: height
      // }}
      >
        <div>
          <div className="col text-right">
            <Button color={'white'} size={'sm'} text={'Logout'} onClick={logoutModal.show} />
          </div>
          {/* <div className="text-center mb-5">

            {user_details && <div className="pb-3">
              <Dropzone
                variant="ICON"
                imageVariant={'rounded'}
                icon={user_details?.profile_photo ? getPhoto(user_details?.profile_photo) : icons.profilePick}
                size='xxl'
                onSelect={(image) => {
                  let encoded = image.toString().replace(/^data:(.*,)?/, "");
                  userProfileEdit(encoded)
                }}
                imagePicker={true}
              />

            </div>
            }
  
          </div> */}
        

          {user_details && <div className="pb-4">
           <ImagePicker
          
                    size='xxl'
                    defaultValue={[{id:'1', photo:user_details?.profile_photo}]}
                    className="text-center"
                    noOfFileImagePickers={1}
                    imageVariant={'rounded'}
                   
                    onSelect={(image) => {
                        let file = image.toString().replace(/^data:(.*,)?/, "")
                        // handleImagePicker( file);
                        userProfileEdit(file)
                      
                    }}
                />
                 </div>
            }
           

          <h3 className="ct-title undefined">Basic Information</h3>

          <div className="row  mt-4">
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">First Name</h5>
              <h4 className="ct-title">{user_details?.name}</h4>
            </div>
            <div className="col-xl-6">
              <h5 className="ct-title text-muted mb-0">Gender</h5>
              <h4 className="ct-title">{getObjectFromArrayByKey(GENDER_LIST, 'id', user_details?.gender)?.text}</h4>
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
          <div className="text-center mb-5">
            {company && company?.attachment_logo && <Image size={'xxl'} variant={'rounded'} src={getPhoto(company?.attachment_logo)} />}
          </div>

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

      {/* <Modal
        isOpen={editProfileModal.visible}
        onClose={() => {
          editProfileModal.hide()
        }}
        title={'Profile Edit'}
        size={'sm'}
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
          size={'sm'}
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
            }}
          />
          <Button
          size={'sm'}
            text={translate("common.submit")}
            onClick={() => {
               userProfileEdit();
            }}
          />
        </div>
      </Modal> */}

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