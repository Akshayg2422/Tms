import React from 'react'
import { Button } from '@Components';
import { useNavigation } from "@Hooks";
import { HOME_PATH , CREATE_BROAD_CAST} from '@Routes';
import { translate } from '@I18n';


function Broadcast() {
    const { goTo ,goBack} = useNavigation();
  return (
    <div className='text-center'>
        <Button text={translate("auth.createBroadCast")!} size={'sm'} 
        onClick={()=> goTo(HOME_PATH.DASHBOARD + CREATE_BROAD_CAST.BROAD_CAST)}
    
        />
    </div>
  )
}

export {Broadcast}