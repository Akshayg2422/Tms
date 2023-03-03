import { Header, Home, Form, Data, Features, UserFriend, EvantManagSystem, RealTime, Experiences, Footer } from '@Modules'
import './index.css';



function Landing() {
  
  

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
