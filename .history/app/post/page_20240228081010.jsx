import ArticleForm from '@components/forms/ArticleForm'
import { fetchArticle } from '@lib/actions/article.action'
import { initialValues } from '@lib/constants/initialValues'
import React from 'react'
import { revalidatePath } from "next/cache";


const page = async ({ searchParams }) => {
    const slug = searchParams?.slug

    let article = initialValues.article
    if (slug) { article = await fetchArticle(slug) }

    return (
        <div className='mt-20'>
            <ArticleForm revalidatePath={revalidatePath('/')} defaultFormValues={article} slug={slug} />
        </div>
    )
}

export default page
