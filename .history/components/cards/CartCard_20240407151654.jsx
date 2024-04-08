'use client'
import Image from "next/image";
import styles from "../../styles/CartCard.module.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { updateCartSpec } from "@actions/cartActions";
// import { useAppDispatch } from "@redux/store";
// import { toggleSpecQuantity } from "@redux/features/cartSlice";
// import { useStateContex } from "@redux/StateProvider";


const CartCard = ({ book, cart_id, isLoading, newSpecValues }) => {
  // const { setSelectedOptions, } = useStateContex();

  // const price = 3;

  // const disableBtn = price === 0 || price < 0;

  // const dispatch = useAppDispatch();
  // const [isCartSpecsModalOpen, setIsCartSpecsModalOpen] = useState(false);
  // const [btnClicked, setBtnClicked] = useState(false);
  // const [specToUpdateIndex, setSpecToUpdateIndex] = useState(null)


  // const [, setDbProduct] = useState({})



  // useEffect(() => {
  //   // !loading - to prevent multiple requests
  //   if (newSpecValues.spec_id && !isLoading) {
  //     const newCartData = {
  //       user_id: product.user_id,
  //       product_id: product.product_id,
  //       cartProductId: product.id,
  //       spec_id: newSpecValues.spec_id,
  //       specifications: {
  //         quantity: newSpecValues.quantity,
  //       },
  //     }

  //     dispatch(updateCartSpec(newCartData, cart_id))
  //   }
  //   setSpecToUpdateIndex(null)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [specToUpdateIndex])

  const handleQuantityUpdates = () => {
    
   };



  return (
    <div className={styles.cartCard__container}>
      <div className={styles.cartCard__wrapper}>
        <p
          //  onClick={() => handleCardSelect(updatedProduct.id)}
          className={styles.radio__wrapper}>
          {" "}
          <input
            readOnly
            // checked={productsToDeleteIds.includes(updatedProduct.id)}
            id={styles.checkbox}
            type="radio" />
        </p>
        <div className={styles.cartCard__containerBox}>
          <div className={styles.cartCard}>
            <div className={styles.image__wrapper}>
              <Image
                src={book?.image}
                width={90}
                height={90}
                alt="carousel"
                className={styles.image}
              />
            </div>
            <div className={styles.cartCard__info}>
              <p className={styles.title}>
                {/* {updatedProduct?.title} */}
                BOOK
              </p>
              <p className={styles.unitPrice}>
                GHS{book?.price}<span>/piece</span>
              </p>
              <div className={styles.unitPrice__qntyBtn}>

                <div className={styles.flexBottom}>
                  <div className={styles.quantityBtns}>
                    <button
                      // disabled={disableBtn}
                      type="button"
                      className={`${styles.minus} `}
                    // onClick={() => handleQuantityUpdates(updatedProduct.specifications[0], -1, 0)}
                    >
                      <span className={styles.qntyIcons}>-</span>
                    </button>
                    <span className={styles.qnty}>{book?.quantity}</span>
                    <button
                      // onClick={() => handleQuantityUpdates(updatedProduct.specifications[0], 1, 0)} 
                      type="button" className={styles.plus}>
                      <span className={styles.qntyIcons}>+</span>
                    </button>
                  </div>
                </div>

              </div>


            </div>
          </div>

          <hr className={styles.divider} />

        </div>
      </div>
    </div>
  );
};

export default CartCard;
