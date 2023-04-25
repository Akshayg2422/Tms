import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {  Button, CommonTable,Image, MenuBar, Dropzone, Modal } from '@Components'
import { getEmployees,addUpdateEmployeePhoto } from '@Redux'
import { useModal, useNavigation } from '@Hooks'
import { HOME_PATH } from '@Routes'
import { translate } from "@I18n";
import { getPhoto,  } from "@Utils";
function CompanyUsers() {

    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    const { employees } = useSelector((state: any) => state.CompanyReducer);
    const editProfileModal = useModal(false);
    const [editPhoto, setEditPhoto] = useState("");
    const [photo, setPhoto] = useState("");
    let attach = [photo]
    let UserProfile = attach.slice(-1, 4)
    const { companyDetailsSelected } = useSelector(
        (state: any) => state.AdminReducer
    );
    const UserProfileEditor=[
        {id:'0',name:"Edit",icon:'bi bi-pencil'},
      ]


      const userProfileEdit=()=>{

        const params={
            attachment:UserProfile[0]

        };

        dispatch(
            addUpdateEmployeePhoto({
                params,
                onSuccess: () => () => { },
                onError: () => () => { }

            })

        )


      }
   
    
    useEffect(() => {
        
        const params = { branch_id: companyDetailsSelected.branch_id };
       
        dispatch(getEmployees({
            params,
            onSuccess: () => () => { },
            onError: () => () => { }
        }));
    }, []);

    const normalizedTableData = (data: any) => {
        return data?.map((el: any) => {
            return {
                name: el.name,
                profile:  el?.profile_image && <Image variant={'rounded'} src={getPhoto(el?.profile_image)} />,
                phone: el?.mobile_number,
                email: el?.email,
                "":   <MenuBar ListedData={UserProfileEditor} onClick={(index)=>{
                    // setSubTaskItem(el)
                   if(index===0)
                   {
                    editProfileModal.show()
                    setEditPhoto(el?.profile_image)
                   }
                  }}  />
            };
        });
    };

    return (
        <div>
            <div className='text-right mt--3'>
                <Button text={translate('common.addUser')} size={'sm'} onClick={() => { goTo(HOME_PATH.ADD_USER) }} />
            </div>
            <div className='mx--3 mt-3'>
                <CommonTable title='User' tableDataSet={employees} displayDataSet={normalizedTableData(employees)} />
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
                
              }}
            />
          </div>
        </Modal>
        </div>
    )
}
export { CompanyUsers }