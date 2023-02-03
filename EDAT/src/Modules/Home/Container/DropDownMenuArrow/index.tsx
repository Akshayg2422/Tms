import React from 'react'
import { DropDownMenuArrowProps } from './interface'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

function DropDownMenuArrow({ onAddClick, onDeleteClick }: DropDownMenuArrowProps) {

  return (
    <div>
      <UncontrolledDropdown>
        <DropdownToggle
          color=""
          size="sm"
          className="btn-icon-only text-light"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <i className="fas fa-ellipsis-v" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem
            // href="#pablo"
            onClick={(e) => { if (onAddClick) { onAddClick(e) } }}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            // href="#pablo"
            onClick={(e) => { if (onDeleteClick) { onDeleteClick(e) } }}
          >
            Delete
          </DropdownItem>

        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

export { DropDownMenuArrow }