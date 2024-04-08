import { BooksListing } from '@components/listing/BooksListing';
import { fetchBooks } from '@lib/actions/book.action';
import { unstable_noStore as noStore } from 'next/cache'

// import LandingPage from '@/components/home/LandingPage'
// import ArticlesListing from '@components/listing/ArticlesListing';
// import { clientRoutes } from '@lib/routes';
import React from 'react'


export default async function Home() {
  noStore();


  // const trendingBooksPromise = fetchTrendingBooks({ limit: 5 });
  const latestBooksPromise = fetchBooks({
    query: undefined,
    page: 1,
    limit: 20,
  }) || { data: [], totalPages: 0 };

  const [ latestBooks] = await Promise.all([latestBooksPromise]);

  const latestBooks=[
    {
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
      "image": "https://picsum.photos/200/300",
      "pages": [280],
      "bookmarks": [],
      "publishedAt": "1960-07-11",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
    {
      "title": "1984",
      "slug": "1984",
      "description": "A dystopian novel by George Orwell.",
      "author_firstName": "George",
      "author_lastName": "Orwell",
      "genre": "Science Fiction",
      "genre_id": "science-fiction",
      "ISBN": "9780451524935",
      "price": 9.99,
      "availability": "In Stock",
      "category": "Dystopian",
      "category_id": "dystopian",
      "image": "https://picsum.photos/200/300",
      "pages": [328],
      "bookmarks": [],
      "publishedAt": "1949-06-08",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
    {
      "title": "Pride and Prejudice",
      "slug": "pride-and-prejudice",
      "description": "A romantic novel by Jane Austen.",
      "author_firstName": "Jane",
      "author_lastName": "Austen",
      "genre": "Romance",
      "genre_id": "romance",
      "ISBN": "9780141439518",
      "price": 8.99,
      "availability": "In Stock",
      "category": "Classic",
      "category_id": "classic",
      "image": "https://picsum.photos/200/300",
      "pages": [432],
      "bookmarks": [],
      "publishedAt": "1813-01-28",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
  ]
  console.log(latestBooks)
  return (
    <main className="flex min-h-screen flex-col  justify-between px-2  pt-14 md:pt-20 select-none">

      {/* <LandingPage /> */}
      <section className='flex flex-col gap-8 md:max-w-3xl md:mx-auto'>
      <div className={''}>
        <BooksListing books={latestBooks.data} />
      </div>
        {/* <ArticlesListing articles={trendingArticles?.data} label='Trending Posts' flex={true} />
        <ArticlesListing articles={latestArticles?.data} label='Latest Posts' flex={false} /> */}
        {/* <div className='flex justify-center'> <Link href={`${clientRoutes.blog}`} className='text-xl mb-6 px-4 py-3 rounded-lg border border-slate-800'> Read more &rarr;</Link></div> */}
      </section>
    </main>
  )
};