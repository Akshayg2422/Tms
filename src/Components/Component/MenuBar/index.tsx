import { useState } from 'react'
import { TripleDotProps } from './interfaces'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


function MenuBar({ ListedData,onClickTagUser,dataIndex, onClick}: TripleDotProps) {


    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle
                    color=""
                    size="sm"
                    className="text-light"
                >
                    <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>

                 { ListedData && ListedData.length>0 && ListedData.map((el:any,index:number)=> { 
                   
                 return(
                 <>
                 
                 <DropdownItem
                        href="#pablo"
                        onClick={()=>onClick(index)}
                    >
                        <i className={el.icon} ></i>
                        
                        {el.name}
                      
        
                    </DropdownItem>
                    </>
                 )})
}

                  

                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export {MenuBar}