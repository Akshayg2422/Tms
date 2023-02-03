import { Breadcrumbs } from "@Components";
import React from "react";

function AlternativeHeader() {
  const breadCrumsData: any= [
    { id: 1, title: 'Function Basic' },
    { id: 2, title: 'Function Advance' },

  ]
  return (
    <>
      <div className="header pb-6">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-xs-7">
                <h6 className="h2 d-inline-block mb-0">Alternative</h6>{" "}
                
                <Breadcrumbs items={breadCrumsData} listClassName={'breadcrumb-links'} className="d-none d-md-inline-block ml-md-4" defaultSelected={breadCrumsData[1]}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export {AlternativeHeader};
