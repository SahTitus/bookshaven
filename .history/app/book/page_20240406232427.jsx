import React from 'react'
import { PageContent } from './PageContent'

const book=    {
    "title": "To Kill a Mockingbird",
    "slug": "to-kill-a-mockingbird",
    "description": "A classic novel by Harper Lee.",
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
    <div>
        <PageContent />
    </div>
  )
}

export default page