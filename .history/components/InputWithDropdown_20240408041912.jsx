import { findDuplicates, removeDuplicates } from '@utils/helpers';
import { useState } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';

export const InputWithDropdown = ({ label, isMultiSelect, options, isRequired, type }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const defaultInputValue = isMultiSelect ? [] : '';
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const [duplicateValues, setDuplicateValues] = useState([])

  const handleRemoveDuplicates = () => {
    const uniqueOptions = removeDuplicates(inputValue)
    setInputValue(uniqueOptions)
    setDuplicateValues([]);
  }

  const handleInputChange = (e) => {
    if (isMultiSelect) {
      const newValue = e.target.value.split(',').map((keyword) => keyword.trim())
      setInputValue(newValue)

      const duplicates = findDuplicates(newValue);

      if (!!duplicates.length) {
        setDuplicateValues(duplicates)
      }

    } else {
      setInputValue(e.target.value);
    }
    setShowDropdown(true); // Show dropdown when typing
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {

      setInputValue(option);
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative" >
      <input
        type={type}
        placeholder={label}
        className="w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        required={isRequired}
        onChange={handleInputChange}
        value={isMultiSelect ? inputValue?.join(', ') : inputValue}
      />

      <div className="z-20 absolute right-0 top-0 mt-10 w-full bg-white rounded-md shadow-lg">
        {duplicateValues.length > 0 &&
          <div className='flex flex-col p-4'>
            These options are duplicated
            <div className='flex bg-slate-300 w-fit'>
              {duplicateValues?.map((duplicate, i) => (
                <p className='mx-2  border-r-2 border-r-white pr-2' key={i}>
                  {duplicate}
                </p>
              ))}

            </div>
            <button
              onClick={handleRemoveDuplicates}
              type='button'
              className='ml-auto py-2 px-4 rounded-lg text-white bg-red-400 flex w-fit'>
              Clear Duplicates</button>
          </div>
        }
        {showDropdown && (
          <ul className='bg-slate-200 max-h-80 overflow-y-scroll'>
            {options?.map((option, index) => (
              <li
                key={index}
                className={` px-4 py-2 cursor-pointer ${isMultiSelect
                  ? inputValue.includes(option)
                    ? 'bg-blue-200'
                    : 'hover:bg-gray-100'
                  : 'hover:bg-slate-100'
                  }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ArrowRight
        onClick={handleDropdownToggle}
        className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
      />
    </div>
  );
};
