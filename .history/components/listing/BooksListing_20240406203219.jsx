import React from 'react'
import Books from './Books'

const BooksListing = ({ Books, label, flex }) => {
    return (
        <div className='flex flex-col px-3 py-6'>
            <p className='text-2xl text-white font-bold'>{label}</p>
            <Books Books={Books} flex={flex}/>
        </div>
    )
}

export default BooksListing