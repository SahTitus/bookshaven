import { unstable_noStore as noStore } from 'next/cache'

import LandingPage from '@/components/home/LandingPage'
// import TopCategories from '@/components/home/TopCategories'
import ArticlesListing from '@components/listing/ArticlesListing';
import { fetchArticles, fetchTrendingArticles } from '@lib/actions/article.action';
import { popularCategories } from '@lib/constants/categories';
import { clientBaseURL, clientRoutes } from '@lib/routes';
import React from 'react'
import Link from 'next/link'
import { Pagination } from '@components/blog/Pagination';
import { seoMetadata } from '@lib/seo';
import { homeMetadata } from '@lib/constants';
import { BackgroundGradient } from '@components/BackgroundGradient';
// import { WhatsappGroup } from '@components/WhatsappGroup';

export const metadata = seoMetadata({
  url: clientBaseURL,
  image: clientRoutes.logo,
  title: homeMetadata.title,
  creator: homeMetadata.creator.name,
  keywords: homeMetadata.keywords,
  description: homeMetadata.description,
});

export default async function Home() {
  noStore();

  const trendingArticlesPromise = fetchTrendingArticles({ limit: 5 });
  const latestArticlesPromise = fetchArticles({
    query: undefined,
    page: 1,
    limit: 20,
  }) || { data: [], totalPages: 0 };

  const [trendingArticles, latestArticles] = await Promise.all([trendingArticlesPromise, latestArticlesPromise]);

  return (
    <main className="flex min-h-screen flex-col  justify-between px-2  pt-14 md:pt-20 select-none">
      <LandingPage />
      <section className='flex flex-col gap-8 md:max-w-3xl md:mx-auto'>
        <ArticlesListing articles={trendingArticles?.data} label='Trending Posts' flex={true} />
        <ArticlesListing articles={latestArticles?.data} label='Latest Posts' flex={false} />
        <div className='flex justify-center'> <Link href={`${clientRoutes.blog}`} className='text-xl mb-6 px-4 py-3 rounded-lg border border-slate-800'> Read more &rarr;</Link></div>
      </section>
      {/* <BackgroundGradient isRight={true} /> */}
    </main>
  )
};