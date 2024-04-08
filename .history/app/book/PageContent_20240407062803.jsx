'use client'
import React from 'react'
import Image from 'next/image'
import styles from '../../styles/BookCard.module.css'
import Rating from '@components/cards/Rating'
import { IoShare, IoShareSocial } from 'react-icons/io5'
import { FaMinus, FaPlus } from "react-icons/fa6";

export const PageContent = ({ book }) => {
    return (
        <div>
            <div className='flex flex-col h-fit pb-6 sm:flex-row sm:items-start'>
                <div className={`flex w-full items-center justify-center`}
                >
                    <Image
                        src={book?.image}
                        width={180}
                        height={150}
                        alt="carousel"
                        style={{ backgroundColor: `#eeeded` }}
                        className={` border border-slate-100 p-3 rounded-xl  ${'w-[240px] h-[290px] md:w-[300px] md:h-[370px]'} shadow-lg relative overflow-hidden`}
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

                        <strong className={`${styles.price} text-2xl text-oran tracking-wider`}>GHS{book?.price?.toFixed(2)}</strong>
                        
                    </div>

                    <div className='flex justify-between items-center gap-2 mt-14' >
                     
                        <div className='relative flex flex-col  gap-2 text-gray'>
                            <p className='absolute -top-7'>Add to Cart</p>
                            <p className='flex items-center justify-between  bg-[#edbc37]  shadow-lg  z-20 rounded-full h-[45px] w-[13rem] text-white '>
                                <span className='text-xl h-full bg-[#f8d985] flex text-center justify-center items-center w-full'><FaMinus /></span>
                                <span className='text-2xl font-semibold'>7</span>
                                <span className='text-xl h-full bg-[#f0b513] rounde flex text-center justify-center items-center w-full'><FaPlus /> </span>
                            </p>
                        </div>
                        <button className=' bg-[#ec6641] z-20  text-white py-2 px-4 font-semibold rounded-full'>Buy Now</button>
                    </div>
                    <hr className='h-[1px] border-none w-full bg-zinc-200 mt-2' />

                    <div className='flex flex-col justify-between  items-center gap-2 text-gray mt-8'>
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
            </div >

        </div >
    )
}
