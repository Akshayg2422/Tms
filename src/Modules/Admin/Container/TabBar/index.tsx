
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "@Modules";
import {Card } from '@Components'


function TabBar() {
  const [selectedTab, setSelectedTab] = useTabs([
    "account",
    "company",
    "team",
    "billing",
    "kyc",
    "your Address",
    "contact Details",
    "bank Details"
  ]);
  
  return (
    <div className="">
      <Card>
    <nav className="d-flex justify-content-center">
        <TabSelector
          isActive={selectedTab === "account"}
          onClick={() => setSelectedTab("account")}
        >
          My Account
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "company"}
          onClick={() => setSelectedTab("company")}
        >
          Company
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "team"}
          onClick={() => setSelectedTab("team")}
        >
          Team Members
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "billing"}
          onClick={() => setSelectedTab("billing")}
        >
          Billing
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "bank Details"}
          onClick={() => setSelectedTab("bank Details")}
        >
          bank Details
        </TabSelector>
        <TabSelector
          isActive={selectedTab ===  "kyc"}
          onClick={() => setSelectedTab( "kyc")}
        >
           kyc
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "your Address"}
          onClick={() => setSelectedTab("your Address")}
        >
          your Address
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "contact Details"}
          onClick={() => setSelectedTab("contact Details")}
        >
         contact Details
        </TabSelector>
      </nav>

      <div className="p-4 d-flex justify-content-center">
        <TabPanel hidden={selectedTab !== "account"}>My Account</TabPanel>
        <TabPanel hidden={selectedTab !== "company"}>Company</TabPanel>
        <TabPanel hidden={selectedTab !== "team"}>Team Members</TabPanel>
        <TabPanel hidden={selectedTab !== "billing"}>Billing</TabPanel>
        <TabPanel hidden={selectedTab !== "account"}> "kyc"</TabPanel>
        <TabPanel hidden={selectedTab !== "company"}>bank Details</TabPanel>
        <TabPanel hidden={selectedTab !== "team"}>your Address</TabPanel>
        <TabPanel hidden={selectedTab !== "billing"}>contact Details</TabPanel>
      </div>
      </Card>

  </div>
 

  
  )
}

export {TabBar}