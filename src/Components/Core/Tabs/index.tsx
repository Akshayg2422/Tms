import React from 'react'
import { TabProps } from './interfaces';

function Tabs({ tabs, activeTab, onTabChange }: TabProps) {
    return (
        <div className={'tabs col-4'}>
            <div className={'tab-buttons d-flex justify-content-around align-items-center border-bottom border-muted text-muted'} style={{ height: '50px' }}>
                {
                    tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`nav-link ${index === activeTab ? 'active' : ''}`}
                            onClick={() => onTabChange(index)}
                        >
                            {tab.title}
                        </div>
                    ))
                }
            </div>
            <div className={'tab-content'}>{tabs[activeTab].content}</div>
        </div>
    )
}


export { Tabs }

