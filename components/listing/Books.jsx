import { BookCard } from '@components/cards/BookCard';
import React from 'react';

const Books = ({ books, flex }) => {
    return (
        <div className='flex flex-col '>
            {books?.map(book => (
                <React.Fragment key={book?._id}>
                    <BookCard book={book} flex={flex} />
                </React.Fragment>
            ))}
        </div>
    )
}

export default Books;