import { Component, useState } from 'react'
import classnames from 'classnames';
import { image } from '@Assets';
import {
  ButtonGroup, CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from 'reactstrap'
import { Header, Home, Form, Data, Features, EaseOfUse, HowItWork, Rev, People, Footer } from '@Modules'
import './index.css';



function Landing() {

  return (
    <div>
      <Header />
      <Home />
      <Form />
      <Data />
      <Features />
      <EaseOfUse />
      <HowItWork />
      <Rev />
      <People />
      <Footer /> 
    </div>

  );
}

export { Landing };
