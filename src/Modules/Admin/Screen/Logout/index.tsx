import React, { useEffect, useState } from 'react';
import { HomeContainer, Divider, Modal, H, Button } from '@Components';
import { useNavigation, } from "@Hooks";
import { Splash } from '@Modules//Auth';
import { ROUTES } from '@Routes'
import { RestoreAdmin, restoreAuth, restoreApp, restoreCompany } from '@Redux'
import {
  useDispatch,
  useSelector
} from 'react-redux'

function Logout() {
  const [modal, setModal] = useState(true);
  const { goTo, goBack } = useNavigation();
  const dispatch = useDispatch()


  return (

    <div>

    </div>
  )
}

export { Logout }