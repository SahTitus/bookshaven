'use client'
import { clientRoutes } from '@lib/routes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';

export const SearchBox = ({ toggleSidebar, isSidebar, defaultQuery }) => {
    const [query, setQuery] = useState(defaultQuery);

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`${clientRoutes.search}?q=${encodeURIComponent(query)}`);
        if (isSidebar) {
            toggleSidebar()
        }
    };
    
    return (
        <div className='flex justify-between items-center py-3 w-full'>
            <form onSubmit={handleSubmit} className='flex justify-between items-center gap-2 bg-transparent rounded-full h-[54px] pl-3 w-full shadow-inner  shadow-slate-900'>
                <input
                    className='bg-transparent flex-1 h-full outline-none'
                    type='text'
                    placeholder='Search here...'
                    onChange={(e) => setQuery((e.target.value))}
                    value={query}
                />
                <button className=' h-full px-5' type='submit' aria-label='search button'>
                    <BsSearch />
                </button>
            </form>
        </div>
    )
}
