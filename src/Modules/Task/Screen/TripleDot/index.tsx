import { TripleDotProps } from './interfaces'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { translate } from '@I18n'

function TripleDot({ onClickTagUser, onClickReassignUser, onClickAttachReference }: TripleDotProps) {

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
                    <DropdownItem
                        href="#pablo"
                        onClick={onClickTagUser}
                    >
                        <h5>{translate('common.tagUser')}</h5>
                    </DropdownItem>

                    <DropdownItem
                        href="#pablo"
                        onClick={onClickReassignUser}
                    >
                        <h5>{translate('common.reassignUser')}</h5>
                    </DropdownItem>

                    <DropdownItem
                        href="#pablo"
                        onClick={onClickAttachReference}
                    >
                        <h5>{translate('common.attachReference')}</h5>
                    </DropdownItem>

                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export { TripleDot }