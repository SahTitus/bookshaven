'use client'
import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { Backdrop } from '@components/Backdrop';
import { SearchBox } from '@components/search/SearchBox';

const MobileMenu = ({ isOpen, toggleSidebar, logOut, signIn, user }) => {
    const [isNav, setIsNav] = useState(true);

    return (
        <div className={`lg:hidden flex h-[100dvh] fixed inset-0 z-40 overflow-hidden transition-transform transform ${isOpen ? 'translate-y-0' : '-translate-y-full opacity-30'} select-none`}>
            <div className="absolute right-0  overflow-hidden  w-11/12 h-full ">
                <Backdrop />
                <div className="relative flex flex-col items-start justify-start w-full h-full  px-4 pt-2 rounded-s-lg border border-transparent transition-colors border-neutral-600 bg-slate-200-800 bg-opacity-90 z-[1000000]">
                    <div className="flex justify-between items-center transition-transform origin-bottom w-full lg:hidden">
                        <button
                            aria-label='close icon'
                            onClick={toggleSidebar}
                            className="text-gray-200 hover:text-gray-500  focus:outline-none focus:text-gray-500  h-12 w-12 text-4xl"
                        >
                            &#x2715;
                        </button>
                    </div>
                    <SearchBox  toggleSidebar={toggleSidebar} isSidebar={true} defaultQuery={''} />
                    <div className="flex flex-col flex-1 rounded-tl-lg gap-3 custom-scrollbar overflow-x-hidden overflow-y-scroll transform  w-full sm:w-full">
                        <MenuItems toggleSidebar={toggleSidebar} isNav={isNav} isLarge={false} />
                    </div>
                    <div className='flex items-center justify-between w-full mt-4 py-3 px-4 shadow shadow-slate-700 rounded'>
                        {user?.id ?
                            (<button onClick={logOut} aria-label='Sign out' className='bg-zinc-100 text-black px-5 py-3 rounded-md text-lg'>Sign Out</button>) :
                            (<button onClick={signIn} aria-label='Sign in' className='bg-zinc-100 text-black px-5 py-3 rounded-md text-lg'>Sign in</button>)}
                        <a aria-label="Buy me a coffee" href={'/'} target="_blank">
                            <button aria-label='Sign up' className='bg-gradient-to-br from-purple-600 to-tomato text-white px-3 py-3 rounded-md text-lg'>Admin</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;