
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "@Modules";
import {Card } from '@Components'


function TabIssueDetails() {
  const [selectedTab, setSelectedTab] = useTabs([
    "THREAD",
    "ATTACH",
    "REFERENCE",
    "USER",
    
  ]);
  
  return (
    <div className="">
 
    <nav className="d-flex justify-content-center">
    <Card className="col-lg-7 col-sm-0 col-12">
        <div className="d-flex justify-content-center">
            
            
        <TabSelector
        className="pl-lg-5 pr-lg-5"
        
          isActive={selectedTab === "THREAD"}
          onClick={() => setSelectedTab("THREAD")}
        >
         THREAD
        </TabSelector>
     
       
        <TabSelector
            className="pl-lg-5 pr-lg-5"
          isActive={selectedTab === "ATTACH"}
          onClick={() => setSelectedTab("ATTACH")}
        >
          ATTACH
        </TabSelector>
        <TabSelector
            className="pl-lg-5 pr-lg-5"
          isActive={selectedTab === "REFERENCE"}
          onClick={() => setSelectedTab("REFERENCE")}
        >
          REFERENCE
        </TabSelector>
        <TabSelector
            className="pl-lg-5 pr-lg-5"
          isActive={selectedTab === "USER"}
          onClick={() => setSelectedTab("USER")}
        >
          USER
        </TabSelector>
        </div>
        </Card>
     
      
      </nav>

      <div className=" d-flex justify-content-center">
        <TabPanel hidden={selectedTab !== "THREAD"}>My Account</TabPanel>
        <TabPanel hidden={selectedTab !== "ATTACH"}>Company</TabPanel>
        <TabPanel hidden={selectedTab !== "REFERENCE"}>Team Members</TabPanel>
        <TabPanel hidden={selectedTab !== "USER"}>Billing</TabPanel>
     
      </div>
     

  </div>
 

  
  )
}

export {TabIssueDetails}