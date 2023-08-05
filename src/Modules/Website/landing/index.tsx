import { Header, Home, Form, Data, Features, UserFriend, EvantManagSystem, RealTime, Experiences, Footer, Cards, PaymentCards, Documentation } from "@Modules"
import './index.css';
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { loginUser } from '@Redux'
import { Divider } from "@Components";



function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loginUser(false)

    )
  }


    , []);



  return (
    <>
      <Header />
      <Home />
      <div style={{backgroundColor:"#dfe6fc"}}>
      <Form />
      <Data />
      <PaymentCards/>
      <Cards />
      <Footer />
      </div>
      
       {/* <Documentation/> */}
        {/* <Features />   */}
      {/* <UserFriend/> */}
      {/* <EvantManagSystem/> */}
      {/* <RealTime/> */}
      {/* <Experiences/> */}

     </>

    

  );
}

export { Landing };
