
import { TabPanel, useTabs } from "react-headless-tabs";
import { CompanyInfo, CompanyIssues, TabSelector } from "@Modules";
import { Card } from '@Components'


function TabCompanyDetails() {
  const [selectedTab, setSelectedTab] = useTabs([
    "info",
    "issue",

  ]);

  return (
    <div className="">

      <nav className="d-flex justify-content-center">
        <div className="col-lg-8 col-sm-0 col-12 pt-4">
          <div className="d-flex justify-content-left">


            <TabSelector
              className="ml-lg-2 pl-lg-5 pr-lg-5 "
              isActive={selectedTab === "info"}
              onClick={() => setSelectedTab("info")}
            >
              INFO
            </TabSelector>


            <TabSelector
              className="pl-lg-5 pr-lg-5"
              isActive={selectedTab === "issue"}
              onClick={() => setSelectedTab("issue")}
            >
              ISSUE
            </TabSelector>

          </div>
        </div>


      </nav>

      <div className=" ">
        <TabPanel hidden={selectedTab !== "info"}><CompanyInfo /></TabPanel>
        <TabPanel hidden={selectedTab !== "issue"}><CompanyIssues /></TabPanel>
      </div>


    </div>



  )
}

export { TabCompanyDetails }