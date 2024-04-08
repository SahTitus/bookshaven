'use client'
import React, { useState } from 'react'
import { SearchBox } from './SearchBox'
import ArticlesListing from '@components/listing/ArticlesListing'
import { NoContent } from '@components/blog/NoContent'
import { Pagination } from '@components/blog/Pagination'
import { InfiniteScrol } from '@components/InfiniteScrol'
import { useRouter } from 'next/navigation'
import { fetchArticlesBySearch } from '@lib/actions/article.action'

export const PageContent = ({ articles, query, currentPage, totalPages, limit, paginationPath }) => {
    const [articlesData, setArticlesData] = useState(articles);
    const router = useRouter()

    const getMoreData = async () => {
        currentPage++
        router.push(`${paginationPath}&page=${currentPage}`, { scroll: false });

        if (currentPage < totalPages) {
            const data = await fetchArticlesBySearch({ query, page: currentPage, limit });
            setArticlesData([...articlesData, ...data.data])
        }
    }
    const hasMore = totalPages > currentPage;
    
    return (
        <div>
            <div className='px-3 md:hidden'>
                <SearchBox
                    isSidebar={false}
                    toggleSidebar={undefined}
                    defaultQuery={query}
                />
            </div>

            <InfiniteScrol
                dataLength={articlesData?.length}
                getMoreData={getMoreData}
                hasMore={hasMore}
                isLoading={false}
            >
                {!!articlesData?.length ?
                    <ArticlesListing
                        articles={articlesData}
                        label='Results'
                        flex={false}
                    /> : <NoContent />
                }
            </InfiniteScrol>
            <Pagination
                pathHasQmark={true}
                path={paginationPath}
                totalPages={totalPages}
                currentPage={currentPage}
                showPagination={false}
            />

        </div >
    )
}
