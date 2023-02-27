import React, { useState } from 'react'
import { TabPanel } from "react-headless-tabs";
import type { TabsProps, TabItem } from './interfaces'

export function Tabs({ tabs }: TabsProps) {

   
    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const changeTab = (item: TabItem) => {
          setSelectedTab(item);
    };

    const getSelectedTabIndex = () =>
        tabs.findIndex((item) => item.id === selectedTab.id);

    return (
        <div>
            <nav
                style={{
                    position: "relative"
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: `calc((100% / ${tabs.length}) * ${getSelectedTabIndex()})`,
                        height: "2px",
                        width: `calc(100% / ${tabs.length})`,
                        background: "#BFEDF0",
                        transition: "all ease 0.2s"
                    }}
                />
                <div
                    style={{
                        display: "flex"
                    }}
                >
                    {tabs.map((item: TabItem) => {
                        return (
                            <a
                                href="#tab"
                                key={item.id}
                                className='text-uppercase text-sm font-weight-bold'
                                style={{
                                    flexGrow: 1,
                                    display: "block",
                                    padding: "1rem",
                                    textDecoration: "none",
                                    color: "#32325d",
                                    background: selectedTab.id === item.id ? "#fcfcfc" : "#fff"
                                }}
                                onClick={() => changeTab(item)}
                                data-tab={item}
                            >
                                {item.title}
                            </a>
                        );
                    })}
                </div>
            </nav>
            <div
               
            >
                {tabs.map((item: TabItem) => {
                    return (
                        <TabPanel
                            key={item.id}
                            hidden={selectedTab.id !== item.id}
                        >
                            {item.component}
                        </TabPanel>
                    );
                })}
            </div>
        </div>
    );
}
