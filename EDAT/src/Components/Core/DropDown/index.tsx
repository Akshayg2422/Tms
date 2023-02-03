import React from "react";

interface DropDownProps {
    heading?: string | null;
    placeholder?: string;
    data?: Array<{ id?: string | number; name?: string; value?: string, title?: string, type?: string, group_name?: string, text?: string, other?: string }>;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string
    title?: string
    value?: string;
    id?: string | number;
    disabled?: boolean
}

const DropDown = ({
    heading,
    placeholder,
    data,
    error,
    onChange,
    name,
    value,
    title,
    id,
    disabled = false,
    ...props
}: DropDownProps) => (

    <div >
        {heading && <label className="form-control-label">{heading}</label>}
        <select value={value} className="form-control form-select" {...props} onChange={onChange} name={name} disabled={disabled}>
            <option >{placeholder}</option>
            {data && data.length > 0 && data.map((item, index) => (
                <option className="dropdown-item" key={index} value={item.id || item.type}>
                    {item.name ? item.name : item.group_name}  {item.title}
                </option>
            ))}
        </select>
        {error && <code className="text-danger">{error}</code>}
    </div>
);

export default DropDown;
