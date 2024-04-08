import BookCard from '@components/cards/BookCard'
import React from 'react';
import dynamic from 'next/dynamic'

const Gads = dynamic(() => import("@components/adsense/Gads"), { ssr: false });

const Books = ({ books, flex }) => {
    return (
        <div className='flex flex-col '>
            {books?.map((book, index) => (
                <React.Fragment key={book?._id}>
                    <BookCard book={book} flex={flex} />
                    {index % 4 === 0 && <Gads key={index} />}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Books;