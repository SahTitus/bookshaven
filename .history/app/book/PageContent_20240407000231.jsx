import React from 'react'
import Image from 'next/image'
import styles from '../../styles/BookCard.module.css'

export const PageContent = ({ book }) => {
    return (
        <div>
            <div className='flex flex-col h-fit'>
                <div className={``}
                >
                    <Image
                        src={book?.image}
                        width={180}
                        height={150}
                        alt="carousel"
                        style={{ backgroundColor: `#eeeded` }}
                        className={`${'w-full h-[250px] md:h-[370px]'} shadow relative rounded-lg overflow-hidden`}
                        placeholder="blur"
                        blurDataURL={book?.image}
                    />
                </div>

                <div className='flex flex-col mt-4 px-4'>
                    <h1 className='text-3xl'>{book?.title}</h1>
                   <div>
                   <p> By: {book?.author_firstName} {" "} {book?.author_lastName}</p>
                   | Published: <p>{book?.publishedAt}</p>
                   </div>
                </div>
            </div>

        </div>
    )
}
