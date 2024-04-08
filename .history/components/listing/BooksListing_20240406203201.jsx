import React from 'react'
import Books from './Books'

const BooksListing = ({ articles, label, flex }) => {
    return (
        <div className='flex flex-col px-3 py-6'>
            <p className='text-2xl text-white font-bold'>{label}</p>
            <Articles articles={articles} flex={flex}/>
        </div>
    )
}

export default ArticlesListing