"use client";
import { BookCard } from "@components/cards/BookCard";
import styles from "../../styles/BookCard.module.css";
import { IoLocation } from "react-icons/io5";

export const BooksListing = ({ books, isLoading }) => {
  const books1 = books?.filter((_, index) => index % 2 === 0);
  const books2 = books?.filter((_, index) => index % 2 !== 0);

  return (
    <div >
      <div className="flex justify-between items-center px-4">
        <p className={styles.list__caption}>Just for You</p>

      </div>
      <div className={styles.booksListing}>
        <div className={styles.books__column}>
          {books1?.map((book,i) => (
            <BookCard
              isLoading={isLoading}
              key={book?._id}
              book={book}
            />
          ))}
        </div>
        <div className={styles.books__column}>
          {books2?.map((book,index) => (
            <BookCard
              isLoading={false}
              key={book?._id}
              book={book}
            />
          ))}
        </div>
        <div className={styles.books__row}>
          {books?.map((book) => (
            <BookCard
              key={book?._id}
              book={book}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
