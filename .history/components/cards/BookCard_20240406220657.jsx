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
      <div className={`${styles.bookCard} shadow rounded-lg`}>
        <div className={styles.card__wrapper}>
          <div className={`${styles.image__wrapper} ${isLoading && styles.wave}`}
          >
            <Image
              src={book?.image}
              width={180}
              height={150}
              alt="carousel"
              style={{ backgroundColor: `${isLoading ? "none" : "#eeeded"}` }}
              className={styles.image}
            // placeholder="blur"
            // blurDataURL="/images/gyasoload.png"
            />
          </div>

          <div className={`${styles.product__info} py-2 space-y-1`}>
            <div className="flex justify-between">
              <p className='font-semibold text-zinc-800 line-clamp-2'>{book?.title}</p>

            </div>

            <strong className={`${styles.price} text-orange tracking-wider`}>GHS{book?.price?.toFixed(2)}</strong>
            <p className=' text-slate-600 p-1 rounded-sm'>{book?.author_firstName} {book?.author_lastName}</p>
            <Rating ratings={[1,4,5,3]} />
            <div className="flex justify-between text-sm items-center">
              <p className='bg-[#ec6641] text-white p-1 rounded-sm'>{book?.genre}</p>
              <p className='bg-[#edbc37] text-white p-1 rounded-sm'>{book?.category}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};