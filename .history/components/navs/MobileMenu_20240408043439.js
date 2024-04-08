'use client'
import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { Backdrop } from '@components/Backdrop';
import { SearchBox } from '@components/search/SearchBox';
import { InputWithDropdown } from '@components/InputWithDropdown';

const MobileMenu = ({ isOpen, toggleSidebar, logOut, signIn, user }) => {
    const [isNav, setIsNav] = useState(true);
    const [filterSearch,setFilterSearch] = useState('category');
    const [isGenre, setIsGenre] = useState(false);
    

    return (
        <div className={`lg:hidden flex h-[100dvh] fixed inset-0 z-40 overflow-hidden transition-transform transform ${isOpen ? 'translate-y-0' : '-translate-y-full opacity-30'} select-none`}>
            <div className="absolute right-0  overflow-hidden  w-11/12 h-full ">
                <Backdrop />
                <div className="relative flex flex-col items-start justify-start w-full h-full  px-4 pt-2 rounded-s-lg border border-neutral-600 bg-slate-100 bg-opacity-100 z-[1000000]">
                    <div className="flex justify-between items-center transition-transform origin-bottom w-full lg:hidden">
                        <button
                            aria-label='close icon'
                            onClick={toggleSidebar}
                            className="text-gray-200 hover:text-gray-500  focus:outline-none focus:text-gray-500  h-12 w-12 text-4xl"
                        >
                            &#x2715;
                        </button>
                    </div>
                    <div className='flex justify-between gap-4 mb-3 mt-5'>
                    <p onClick={() => setIsGenre(true)} className={`${isGenre ? 'border-b border-zinc-500 rounded-lg' : ''} flex items-center justify-center text-xl font-bold  py-2 px-5 text-gray-800 cursor-pointer`}>Sign in</p>
                    <p onClick={() => setIsGenre(false)} className={`${!isGenre ? 'border-b border-zinc-700 rounded-lg ' : ''} flex items-center justify-center text-xl font-bold  py-2 px-5 text-gray-800 cursor-pointer`}>Sign up</p>
                </div>
                    <InputWithDropdown  toggleSidebar={toggleSidebar} isSidebar={true} label='' options={} />
                    <div className="flex flex-col flex-1 rounded-tl-lg gap-3 custom-scrollbar overflow-x-hidden overflow-y-scroll transform  w-full sm:w-full">
                        <MenuItems toggleSidebar={toggleSidebar} isNav={isNav} isLarge={false} />
                    </div>
                    <div className='flex items-center justify-between w-full mt-4 py-3 px-4 shadow shadow-slate-700 rounded'>
                        {user?.id ?
                            (<button onClick={logOut} aria-label='Sign out' className='bg-zinc-100 text-black px-5 py-3 rounded-md text-lg'>Sign Out</button>) :
                            (<button onClick={signIn} aria-label='Sign in' className='bg-zinc-100 text-black px-5 py-3 rounded-md text-lg'>Sign in</button>)}
                            <button aria-label='Sign up' className='bg-gradient-to-br from-oran to-[#fb0] text-white px-3 py-3 rounded-md text-lg'>Admin</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;