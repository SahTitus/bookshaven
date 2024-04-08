import { useState } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { BsSearch } from 'react-icons/bs';

export const InputWithDropdown = ({ label, options, isSidebar, toggleSidebar, id }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  console.log(options)

  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {


    setQuery(e.target.value);

  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setQuery(option);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSidebar) {
      toggleSidebar()
    }
  };

  return (
    <div className='relative flex justify-between items-center py-3 w-full'>
      <form onSubmit={handleSubmit} className='flex justify-between items-center gap-2 bg-transparent rounded-full h-[54px] pl-3 w-full shadow-inner  shadow-slate-900'>
        <input
          onClick={handleDropdownToggle}
          type={'text'}
          placeholder={label}
          className='bg-transparent flex-1 h-full outline-none'
          required={true}
          onChange={handleInputChange}
          value={query}
        />

        <div className="  z-20 absolute right-0 top-8 mt-10 w-full bg-white rounded-md shadow-lg">

          {showDropdown && (
            <ul className='bg-slate-200 py-2 max-h-80 overflow-y-scroll'>
              {options?.map((option, index) => (
                <li
                  key={index}
                  className={` px-4 py-2 cursor-pointer  hover:bg-white hover:text-oran  `}
                  onClick={() => handleOptionSelect(option?.name)}
                >
                  {option?.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type='submit' className='flex items-center jusc bg-oran rounded-full h-14 w-14'>
          <BsSearch
            className=" text-xl text-white cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
};
