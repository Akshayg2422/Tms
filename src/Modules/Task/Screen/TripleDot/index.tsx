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
                        {translate('common.tagUser')}
                    </DropdownItem>

                    <DropdownItem
                        href="#pablo"
                        onClick={onClickReassignUser}
                    >
                        {translate('common.reassignUser')}
                    </DropdownItem>

                    <DropdownItem
                        href="#pablo"
                        onClick={onClickAttachReference}
                    >
                        {translate('common.attachReference')}
                    </DropdownItem>

                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export { TripleDot }