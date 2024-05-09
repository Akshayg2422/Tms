import { useState } from 'react'
import { AttachmentMenuProps } from './interfaces'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Button, Image, ImageIcon } from '@Components'
import { icons } from '@Assets'


function AttachmentMenu({ toggleIcon, menuData, onClick }: AttachmentMenuProps) {
    return (
        <div>
            <UncontrolledDropdown >
                <DropdownToggle
                    color=""
                    size="md"
                    className="text-light row">
                    {toggleIcon ? <ImageIcon src={toggleIcon} width={25} height={25} /> : <Button color={'white'} size={'lg'} variant={'icon-rounded'} icon={icons.upload} />}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow " center>
                    {menuData && menuData.length > 0 && menuData.map((el: any, index: number) => {
                        const { id, icon, name } = el

                        return (
                            <>
                                <DropdownItem onClick={() => {
                                    if (onClick) {
                                        onClick(el)
                                    }
                                }
                                }>
                                    <div className=''>
                                        
                                        {icon && 
                                        <ImageIcon src={icon} width={20} height={20}/>}
                                        {name}
                                    
                                    </div>
                                </DropdownItem>
                            </>
                        )
                    })
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export { AttachmentMenu }