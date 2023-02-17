import React, { useState } from 'react'
import { TabProps } from './interfaces';
import { Tab, TabList, TabPanel } from 'react-tabs';

function Tabs({ tabs, activeTab, onTabChange }: TabProps) {

    return (
        <div className={'col-4'}>
            <div className={'d-flex justify-content-center align-items-center fixed-top text-muted'} style={{ height: '50px' }}>
                <div
                    className={'nav nav-pills'}>
                    {
                        tabs.map((tab, index) => (
                            <Tab
                                key={index}>
                                <button className={`nav-link ${index === activeTab ? 'active' : ''}`} onClick={() => onTabChange(index)}>
                                    {tab.title}
                                </button>
                            </Tab>
                        ))}
                </div>
            </div>
            <div className={'tab-content'}>{tabs[activeTab].content}</div>
        </div>
    )
}


export { Tabs }

