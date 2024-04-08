"use client";
import BookCardCard from "./BookCardCard";
import styles from "../../styles/cards/BookCardCard.module.css";
import { IoLocation } from "react-icons/io5";
import { BookCard } from "@components/cards/BookCard";

const ProductsListing = ({ books, isLoading }) => {
  const books1 = books?.filter((_, index) => index % 2 === 0);
  const books2 = books?.filter((_, index) => index % 2 !== 0);

  return (
    <div >
      <div className="flex justify-between items-center px-4">
        <p className={styles.list__caption}>Just for You</p>

      </div>
      <div className={styles.booksListing}>
        <div className={styles.books__column}>
          {books1?.map((product) => (
            <BookCardCard
              isLoading={isLoading}
              key={product?._id}
              product={product}
            />
          ))}
        </div>
        <div className={styles.books__column}>
          {books2?.map((product) => (
            <BookCardCard
              isLoading={isLoading}
              key={product?._id}
              product={product}
            />
          ))}
        </div>
        <div className={styles.books__row}>
          {products?.map((product) => (
            <BookCardCard
              key={product?._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
