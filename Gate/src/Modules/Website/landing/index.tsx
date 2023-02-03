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
import { Input, Card, Image, Divider, Badge, Heading, Paragraph, Button, Title } from '@Components';
import { Header, Home, Form, Data, Features, EaseOfUse, HowItWork, Rev, People, Footer } from '@Modules'
import './index.css';
import { translate } from "@I18n";



function Landing() {
  const [navPill, setnavPill] = useState(1)
  const toggleNavs = (e: React.MouseEvent<HTMLAnchorElement,
    MouseEvent>, index: number) => {
    e.preventDefault();
    setnavPill(index)
  };

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
      {/* <Footer />  */}
    </div>

  );
}

export { Landing };
