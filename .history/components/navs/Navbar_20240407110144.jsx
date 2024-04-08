"use client"
import React, { useState } from 'react'
// import MobileMenu from './MobileMenu'
import { usePathname } from 'next/navigation';
import { MenuItems } from './MenuItems';
import { useAppSelector } from '@redux/store';
import { useStateContex } from '@redux/StateProvider';
import { signOut } from 'next-auth/react';
import Logo from '@components/Logo';
import { BsCart2 } from "react-icons/bs";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const hideNavbar = pathname.startsWith('/article/')
    const { setShowAuthForm, toggleShowAuthForm, openCartSpecsModal, } = useStateContex();
    const { user } = useAppSelector((state) => state.auth);

    const toggleSidebar = () => { setIsOpen(!isOpen) };
    const logOut = () => {
        signOut();
        toggleShowAuthForm();
    };

    const signIn = () => {
        toggleSidebar();
        setShowAuthForm(true)
    };

    return (
        <nav className={`${hideNavbar ? 'hidden' : 'flex'} z-30 max-w-full w-full items-center md:justify-center select-none`}>
            <div className="fixed  top-0 h-[65px] px-2 flex items-center w-full md:w-[90%]  justify-between border-b  bg-gradient-to-b z-50 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit  lg:rounded-xl lg:border  lg:p-4 ">
                <Logo
                    width={20}
                    height={20}
                />
                <div className='relative flex'>
                <BsCart2 className='text-3xl' onClick={openCartSpecsModal} />
                <p className='flex items-center justify-center bg-oran text-white rounded-full h-6 w-6'>8</p>
                </div>
                <div className='hidden md:flex'>
                    <MenuItems toggleSidebar={undefined} isNav={false} isLarge={true} />
                </div>
                <button type='button' aria-label='menu-icon' onClick={toggleSidebar} className={`${isOpen ? 'hidden' : 'flex'} text-4xl justify-center text-center items-center h-12 w-12  cursor-pointer md:hidden`}>&#9776;</button>
                {/* <MobileMenu logOut={logOut} isOpen={isOpen} signIn={signIn} toggleSidebar={toggleSidebar} user={user} /> */}
            </div>
        </nav>
    )
};