import React, { useEffect, useState } from 'react';
import { HomeContainer, Divider, Modal, H, Button } from '@Components';
import { useNavigation, } from "@Hooks";
import { Splash } from '@Modules//Auth';
import {ROUTES} from '@Routes'
import { RestoreAdmin,restoreAuth,restoreApp,restoreCompany} from '@Redux'
import {
    useDispatch,
    useSelector
  } from 'react-redux'

function Logout() {
    const [modal, setModal] = useState(true);
    const { goTo,goBack } = useNavigation();
    const dispatch = useDispatch()


  return (
   
    <div>
         <Modal size={'md'} isOpen={modal} fade={false} onClose={() => setModal(!modal)}  >
            <div className=' d-flex justify-content-center mt--5'>
                <div className='h3'>
                Are You Want To Logout

                </div>
        
            </div>
            <div className=' d-flex  justify-content-center  pt-3'>
            <div className='pr-lg-3'>
                <Button text={'Yes'} onClick={()=>{
                   
                  localStorage.clear()
                  dispatch(
                    restoreApp()
                  )
                  dispatch(
                    restoreAuth()
                  )
                  dispatch(
                    restoreCompany()
                  )
                  dispatch(
                    RestoreAdmin()
                  )
                  goTo(ROUTES.AUTH.LOGIN, true)
                 
                  }}/>

                </div>
               <div className='pl-lg-3'>
               <Button text={'No'} onClick={()=>goBack()}/>

               </div>

            </div>
           
                
           
        
            
                </Modal>
    </div>
  )
}

export{ Logout}