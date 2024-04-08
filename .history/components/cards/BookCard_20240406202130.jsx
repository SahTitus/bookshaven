"use client";
import Image from "next/image";
import styles from "../../styles/cards/ProductCard.module.css";
import Link from "next/link";
// import { getProduct } from "@redux/features/productsSlice";
import { useAppDispatch } from "@redux/store";
import { IoLocation } from "react-icons/io5";
import ImgComp from "@components/ImgComp";
import { initialValues } from "@lib/constants/initialValues";
export const BookCard = ({ book, isLoading }) => {

  console.log(book)


  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(getProduct(book));
  };

  return (
    <Link onClick={handleOnClick} href={`/products/${_id}?dsp=${true}`}>
      <div className={`${styles.productCard} shadow rounded-lg`}>
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
              placeholder="blur"
              blurDataURL="/images/gyasoload.png"
            />
          </div>

          <div className={`${styles.product__info} py-2 space-y-1`}>
            <div className="flex justify-between">
              <strong className={`${styles.price} text-orange tracking-wider`}>GHS{book?.price?.toFixed(2)}</strong>
              <ImgComp size={20} name="verified.png" classId="gyasoIcon" />
            </div>
            <p className='text-sm text-gray line-clamp-2'>{book?.title}</p>

            <div className="flex justify-between text-sm items-center">
              {/* <VscVerifiedFilled className=" text-green-400"/> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};