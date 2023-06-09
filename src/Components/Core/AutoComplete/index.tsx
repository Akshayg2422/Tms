import React, { useState } from 'react';

const Autocomplete = ({ options, onSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    setQuery(option);
    onSelect(option);
    setFilteredOptions([]);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.autocomplete')) {
      setFilteredOptions([]);
    }
  };

  document.addEventListener('click', handleOutsideClick);

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      {filteredOptions.length > 0 && (
        <ul className="autocomplete-options">
          {filteredOptions.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export {Autocomplete};
