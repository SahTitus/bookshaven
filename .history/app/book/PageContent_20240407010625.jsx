'use client'
import React from 'react'
import Image from 'next/image'
import styles from '../../styles/BookCard.module.css'
import Rating from '@components/cards/Rating'
import { IoShare, IoShareSocial } from 'react-icons/io5'

export const PageContent = ({ book }) => {
    return (
        <div>
            <div className='flex flex-col h-fit pb-6'>
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

                    <div className='flex justify-between  items-center gap-2 text-gray mt-3'>

                        <div className='flex items-center gap-6 text-gray'>
                            <Rating ratings={[3, 0, 0, 0, 0]} />
                            <IoShareSocial />
                        </div>


                        <button className=' bg-[#ec6641] z-20 rounded-br-full  text-white pl-2 py-[2px] pr-6 rounded-sm'>Buy Now</button>
                    </div>

                    <div className='flex gap-2 mt-6' >
                        <strong className={`${styles.price} text-xl text-oran tracking-wider`}>GHS{book?.price?.toFixed(2)}</strong>
                        <div className='flex flex-1 justify-end items-center gap-2 text-gray'>
                            <p className=' bg-[#edbc37] z-20 rounded-br-full  text-white pl-2 py-[2px] pr-6 rounded-sm'>Add to Cart</p>
                            {/* <p className=' bg-[#ec6641] z-20 rounded-br-full  text-white pl-2 py-[2px] pr-6 rounded-sm'>{book?.genre}</p>
                                <p className=' bg-[#edbc37] z-20 rounded-br-full  text-white pl-2 py-[2px] pr-6 rounded-sm'>{book?.category}</p> */}
                        </div>
                    </div>
                    <hr className='h-[1px] border-none w-full bg-zinc-800 mt-2' />

                    <div className='flex flex-col justify-between  items-center gap-2 text-gray mt-3'>
                        <p className='flex items-center gap-2 bg-slate-200 w-full p-2'>
                            <span className='font-semibold text-lg w-2/6'>Genre</span>
                            <span>{book?.genre}</span>
                        </p>
                        <p className='flex items-center gap-2 bg-slate-200 w-full p-2'>
                            <span className='font-semibold text-lg w-2/6'>Category</span>
                            <span>{book?.category}</span>
                        </p>
                        <p className='flex items-center gap-2 bg-slate-200 w-full p-2'>
                            <span className='font-semibold text-lg w-2/6'>ISBN</span>
                            <span>{book?.ISBN}</span>
                        </p>
                        <p className='flex items-center gap-2 bg-slate-200 w-full p-2'>
                            <span className='font-semibold text-lg w-2/6'>Pages</span>
                            <span>{book?.pages}</span>
                        </p>
                        <p className='flex items-center gap-2 bg-slate-200 w-full p-2'>
                            <span className='font-semibold text-lg w-2/6'>Availability</span>
                            <span>{book?.availability}</span>
                        </p>
                    </div>

                    <p className='mt-5 px-1 line-clamp-10'>{book?.description}</p>
                </div>
            </div>

        </div>
    )
}
