
import { TabPanel, useTabs } from "react-headless-tabs";
import { IssueDetails, IssueUsers, ReferenceIssue, TabSelector } from "@Modules";



function TabIssueDetails() {
  const [selectedTab, setSelectedTab] = useTabs([
    "THREAD",
    "ATTACH",
    "REFERENCE",
    "USER",
    
  ]);
  
  return (
    <div className="">
 
    <nav className="d-flex justify-content-center mt-3">
    <div className="col-lg-7 col-sm-0 col-12">
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
        </div>
     
      
      </nav>

      <div className="">
        <TabPanel hidden={selectedTab !== "THREAD"}>My Account</TabPanel>
        <TabPanel hidden={selectedTab !== "ATTACH"}>Company</TabPanel>
        <TabPanel hidden={selectedTab !== "REFERENCE"}><IssueDetails/></TabPanel>
        <TabPanel hidden={selectedTab !== "USER"}><IssueUsers/></TabPanel>
     
      </div>
   

  </div>
 

  
  )
}

export {TabIssueDetails}