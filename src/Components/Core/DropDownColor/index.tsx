import React from "react";
import { Color } from '@Components'

interface DropDownColorProps {
    className?: string;
    heading?: React.ReactNode;
    data: Option[];
    selected?: Option;
    value?: Option;
    onChange?: (item: Option) => void;
    renderItem?: (item: Option) => React.ReactNode;
}
export type Option = {
    color?: Color | undefined;
    id: number | string  ;
    text: string;
    other?: string
}

const DropDownColor = ({
    className,
    heading,
    data,
    selected,
    value,
    onChange,
    renderItem,
}: DropDownColorProps) => {
    const handleItemClick = (item: Option) => {
        if (onChange) {
            onChange(item);
        }
    };

    return (
        <div className={className}>
            {heading}
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {selected?.text}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {data.map((item: Option) => (
                        <a
                            key={item.id}
                            className={`dropdown-item ${selected?.id === item.id ? "active" : ""
                                }`}
                            onClick={() => handleItemClick(item)}
                            style={{ color: item.color }}
                        >
                            <span style={{ marginRight: "0.5rem" }}>&#8226;</span>{item.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { DropDownColor };