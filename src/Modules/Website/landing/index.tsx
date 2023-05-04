import { Header, Home, Form, Data, Features, UserFriend, EvantManagSystem, RealTime, Experiences, Footer } from '@Modules'
import './index.css';
import React, { useEffect } from "react";
import { useDispatch} from 'react-redux'
import {loginUser} from '@Redux'



function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loginUser(false)

    )
      }
    
   
  ,[]);
  
  

  return (
    <div>
      <Header />
      <Home />
      <Form />
      <Data />
      <Features />  
      <UserFriend/>
      <EvantManagSystem/>
      <RealTime/>
      <Experiences/>
      <Footer /> 
    </div>

  );
}

export { Landing };
