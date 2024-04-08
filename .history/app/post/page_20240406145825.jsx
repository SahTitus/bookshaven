import BookForm from '@components/forms/BookForm'
import { fetchBook } from '@lib/actions/Book.action'
import { initialValues } from '@lib/constants/initialValues'
import React from 'react'
import { revalidatePath } from "next/cache";


const page = async ({ searchParams }) => {
    const slug = searchParams?.slug

    let Book = initialValues.Book
    if (slug) { Book = await fetchBook(slug) }

    return (
        <div className='mt-20'>
            <BookForm revalidatePath={revalidatePath('/')} defaultFormValues={Book} slug={slug} />
        </div>
    )
}

export default page
