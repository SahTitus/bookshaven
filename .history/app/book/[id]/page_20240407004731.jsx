import React from 'react'
import { PageContent } from '../PageContent'

const book=    {
    _id:'4twreeeeeeo6oh0hh09h',
    "title": "To Kill a Mockingbird",
    "slug": "to-kill-a-mockingbird",
    "description": "A classic novel by Harper Lee.                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere officiis ab fugiat laudantium temporibus. Iste similique quae modi libero vero tenetur repudiandae nesciunt impedit saepe, aliquid, exercitationem iusto, suscipit ipsum    ",
    "author_firstName": "Harper",
    "author_lastName": "Lee",
    "genre": "Fiction",
    "genre_id": "fiction",
    "ISBN": "9780061120084",
    "price": 10.99,
    "availability": "In Stock",
    "category": "Classic",
    "category_id": "classic",
    "image": "https://picsum.photos/200/300?random=1",
    "pages": [280],
    "bookmarks": [],
    "publishedAt": "1960-07-11",
    "modifiedAt": "2024-04-06T12:00:00.000Z"
  };

const page = () => {

  return (
    <div className='mt-[4rem]'>
        <PageContent book={book} />
    </div>
  )
}

export default page