"use client";
import ProductCard from "./ProductCard";
import styles from "../../styles/cards/ProductCard.module.css";
import HomeProductCarousel from "@components/carousels/HomeProductCarousel";
import { IoLocation } from "react-icons/io5";

const ProductsListing = ({ products, isLoading }) => {
  const books1 = products?.filter((_, index) => index % 2 === 0);
  const s2 = products?.filter((_, index) => index % 2 !== 0);

  return (
    <div >
      <div className="flex justify-between items-center px-4">
        <p className={styles.list__caption}>Just for You</p>
        <div className="flex items-center cursor-pointer">
          <IoLocation className='text-[#e7813d] text-xl' />
          <p className="text-base text-[#e7813d]">
            <span>Bono </span>{", "}
            <span>Sunyani</span>
          </p>
        </div>
      </div>
      <div className={styles.booksListing}>
        <div className={styles.books__column}>
          <HomeProductCarousel />
          {books1?.map((product) => (
            <ProductCard
              isLoading={isLoading}
              key={product?._id}
              product={product}
            />
          ))}
        </div>
        <div className={styles.books__column}>
          {s2?.map((product) => (
            <ProductCard
              isLoading={isLoading}
              key={product?._id}
              product={product}
            />
          ))}
        </div>
        <div className={styles.books__row}>
          {products?.map((product) => (
            <ProductCard
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
