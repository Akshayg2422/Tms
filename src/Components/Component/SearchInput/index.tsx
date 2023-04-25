import React from 'react'
import { translate } from '@I18n'
import { InputHeading } from '@Components'
import { useInput } from '@Hooks'
import { SearchInputProps } from './interfaces'

function SearchInput({ heading, onSearch }: SearchInputProps) {
    const search = useInput('')
    return (
        <div>
            {heading && <InputHeading heading={heading} />}
            <div className="input-group bg-white border">
                <input
                    type="text"
                    className="form-control bg-transparent border border-0  form-control-sm"
                    placeholder={translate("auth.search")!}
                    value={search.value}
                    onChange={search.onChange}
                />
                <span
                    className="input-group-text pointer border border-0"
                    onClick={
                        () => {
                            if (onSearch) {
                                onSearch(search.value)
                            }
                        }
                    }>
                    <i className="fas fa-search" />
                </span>
            </div>
        </div >
    )
}

export { SearchInput }