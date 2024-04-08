"use client";
import Image from "next/image";
import styles from "../../styles/cards/ProductCard.module.css";
import Link from "next/link";
import { getProduct } from "@redux/features/productsSlice";
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
              src={imgUrl}
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
              <strong className={`${styles.price} text-orange tracking-wider`}>GHS{price?.toFixed(2)}</strong>
              <ImgComp size={20} name="verified.png" classId="gyasoIcon" />
            </div>
            <p className='text-sm text-gray line-clamp-2'>{title}</p>
            {preorder && (
              <div className={`${styles.preorder} my-3`}>
                <Image
                  src={`/images/airplane.png`}
                  width={25}
                  height={30}
                  alt="carousel"
                  className={styles.aeroplane}
                />
                <p>Sponsored</p>
              </div>
            )}

            {orders > 0 && (
              <span className={`${styles.btmText} ${styles.orders}`}>
                {orders} order{orders > 1 ? "s" : ""}
              </span>
            )}

            {moq > 0 && <p className='text-sm text-gray'>
              MOQ : {moq} piece{moq > 1 ? "s" : ""}
            </p>}
            <div className="flex items-center">
              <IoLocation className='text-[#e7813d] text-lg' />
              <p className="text-xs text-[#e7813d]">
                <span>Greater Accra</span>{", "}
                <span>Kokomlemle</span>
              </p>
            </div>
            <div className="flex justify-between text-sm items-center">
              <div className="flex items-center gap-1">
                <ImgComp size={15} name={`${seller_type}.png`} classId="gyasoIcon" />
                <p className="text-sm text-gray">Gyaso Imports</p>
              </div>
              {/* <VscVerifiedFilled className=" text-green-400"/> */}
            </div>
          </div>
          <p className="text-xs text-gray bg-[#f7f7f7] rounded-full w-fit px-2 py-1">{condition}</p>
        </div>
      </div>
    </Link>
  );
};