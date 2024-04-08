'use client'
import Image from "next/image";
import styles from "../../styles/CartCard.module.css";
import { updateCart } from "@lib/actions/cart.action";
import { useStateContex } from "@redux/StateProvider";
import { MdDelete } from "react-icons/md";

const CartCard = ({ book, cart_id, user, isLoading }) => {

  const { setCartBooks, } = useStateContex();

  const handleQuantityUpdates = async (action) => {
    const data = {
      action: action,
      userId: user?.id,
      cart_id: cart_id
    }

    const updatedItem = await updateCart(data);

    setCartBooks(prevState =>
      prevState.map(cartBook => {
        // If the cartBook's _id matches the updatedItem._id, update it
        if (cartBook._id === updatedItem._id) {
          return updatedItem; // Replace the cartBook with the updatedItem
        } else {
          return cartBook; // Otherwise, keep the cartBook unchanged
        }
      })
    );

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
                {book?.title}
              </p>
              <p className={styles.unitPrice}>
                GHS{book?.price}<span>/piece</span>
              </p>
              <div className={styles.unitPrice__qntyBtn}>
              <MdDelete className="text-gr" /> 
                <div className={styles.flexBottom}>
                  <div className={styles.quantityBtns}>
                    <button
                      type="button"
                      className={`${styles.minus} `}
                      onClick={() => handleQuantityUpdates('dec')}
                    >
                      <span className={styles.qntyIcons}>-</span>
                    </button>
                    <span className={styles.qnty}>{book?.quantity}</span>
                    <button
                      onClick={() => handleQuantityUpdates('inc')}
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
