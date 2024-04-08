import { BooksListing } from '@components/listing/BooksListing';
import { unstable_noStore as noStore } from 'next/cache'

// import LandingPage from '@/components/home/LandingPage'
// import ArticlesListing from '@components/listing/ArticlesListing';
// import { clientRoutes } from '@lib/routes';
import React from 'react'


export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col  justify-between px-2  pt-14 md:pt-20 select-none">

      {/* <LandingPage /> */}
      <section className='flex flex-col gap-8 md:max-w-3xl md:mx-auto'>
      <div className={styles.products}>
        <BooksListing isLoading={isLoading} products={productsData} />
      </div>
        {/* <ArticlesListing articles={trendingArticles?.data} label='Trending Posts' flex={true} />
        <ArticlesListing articles={latestArticles?.data} label='Latest Posts' flex={false} /> */}
        {/* <div className='flex justify-center'> <Link href={`${clientRoutes.blog}`} className='text-xl mb-6 px-4 py-3 rounded-lg border border-slate-800'> Read more &rarr;</Link></div> */}
      </section>
    </main>
  )
};