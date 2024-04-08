"use client";
import Image from "next/image";
import styles from "../../styles/BookCard.module.css";
import Link from "next/link";
import { IoLocation } from "react-icons/io5";
import Rating from "./Rating";
export const BookCard = ({ book, isLoading }) => {

  console.log(book)


  const handleOnClick = () => {

  };

  return (
    <Link onClick={handleOnClick} href={`/books/${book?._id}`}>
      <div className={`${styles.bookCard} shadow rounded-lg bg-[]`}>
        <div className={styles.card__wrapper}>
              <p className='absolute bg-[#edbc37] z-20 rounded-br-full  text-white pl-2 py-[2px] pr-6 rounded-sm'>{book?.category}</p>
          <div className={`${styles.image__wrapper} ${isLoading && styles.wave}`}
          >
            <Image
              src={book?.image}
              width={180}
              height={150}
              alt="carousel"
              style={{ backgroundColor: `${isLoading ? "none" : "#eeeded"}` }}
              className={styles.image}
              placeholder="blur"
              blurDataURL={book?.image}
            />
          </div>

          <div className={`${styles.product__info} py-2 space-y-1`}>
            <div className="flex justify-between">
            <strong className={`${styles.price} text-oran tracking-wider`}>GHS{book?.price?.toFixed(2)}</strong>

            </div>
              <p className='font-semibold text-zinc-800 line-clamp-2'>{book?.title}</p>

            <p className=' text-slate-600  rounded-sm text-sm'><span>by</span> {book?.author_firstName} {book?.author_lastName}</p>
            <Rating ratings={[3,0,0,0,0]} />
            <div className="flex justify-between text-sm items-center">
              <button aria-label="view-book" type="button" className='bg-[#ec6641] text-white py-2 rounded-full text-sm font-semibold w-full'>View Book</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};