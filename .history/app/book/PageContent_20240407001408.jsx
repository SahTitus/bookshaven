'use client'
import React from 'react'
import Image from 'next/image'
import styles from '../../styles/BookCard.module.css'
import Rating from '@components/cards/Rating'
import { IoShare, IoShareSocial } from 'react-icons/io5'

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
                    <div className='flex items-center gap-2 text-gray'>
                        <p> By: {book?.author_firstName} {" "} {book?.author_lastName}</p>
                        | Published: <p>{book?.publishedAt}</p>
                    </div>
                    <div className='flex items-center gap-2 text-gray'>
                        <Rating ratings={[3, 0, 0, 0, 0]} />
                        <IoShareSocial />
                    </div>
                    <div className='flex items-center gap-2 text-gray'>
                        <p className=' bg-[#edbc37] z-20 rounded-br-full  text-white pl-2 py-[2px] pr-6 rounded-sm'>{book?.category}</p>
                        <p className=' bg-[#ec6641] z-20 rounded-br-full  text-white pl-2 py-[2px] pr-6 rounded-sm'>{book?.category}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}
