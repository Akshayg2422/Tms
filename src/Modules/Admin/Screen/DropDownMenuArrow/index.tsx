import { DropDownMenuArrowProps } from './interfaces'
import {UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'

function DropDownMenuArrow({onClickTagUser,onClickReassignUser,onClickAttachReference}:DropDownMenuArrowProps ) {

  return (
    <div>
    <UncontrolledDropdown>
      <DropdownToggle
        color=""
        size="sm"
        className="btn-icon-only text-light"
      >
        <i className="fas fa-ellipsis-v" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem
          href="#pablo"
          onClick={onClickTagUser}
        >
          TagUser
        </DropdownItem>

        <DropdownItem
          href="#pablo"
          onClick={onClickReassignUser}
        >
          ReassignUser
        </DropdownItem>

        <DropdownItem
          href="#pablo"
          onClick={onClickAttachReference}
        >
          AttachReference
        </DropdownItem>

      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
  )
}

export {DropDownMenuArrow}