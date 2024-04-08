
"use client"
import { useStateContex } from "@redux/StateProvider";
import styles from "../styles/CartSpecsModal.module.css";
import { FaX } from "react-icons/fa6";
import CartCard from "./cards/CartCard";
import { useEffect, useState } from "react";
import { fetchCartItems, orderBooks } from "@lib/actions/cart.action";
import { useAppSelector } from "@redux/store";
import { runFireworks } from "@utils/fireworks";
import { useRouter } from "next/navigation";

const CartSpecsModal = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [selectedIds, setSelecetdIds] = useState([]);
  
  const router = useRouter();

  const {
    closeCartModal,
    isCartSpecsModalOpen, calculateTotal, setShowLoaderOverlay, setTotalCartQnty, cartBooks, setCartBooks } = useStateContex();

  const total = calculateTotal(selectedIds);

  const handleOrder = async () => {
    setShowLoaderOverlay(true)
    const orderData = {
      quantity: total.totalQuantity,
      status: 'pending',
      userID: user.id,
      bookIDs: selectedIds,
      price: total?.totalPrice
    };

    if (!!selectedIds?.length) {
      const result = await orderBooks(orderData);

      closeCartModal()

      if (result._id) {
          runFireworks();
      }
    }
    setShowLoaderOverlay(false)
  };

  useEffect(() => {
    const getCartItems = async () => {
      setShowLoaderOverlay(true)
      const data = await fetchCartItems(user?.id)
      setTotalCartQnty(data.totalItems)

      setCartBooks(data.data)
      setShowLoaderOverlay(false)
    }
    if (user?.id) {
      getCartItems()
    }
  }, [user?.id])

  return (
    <div
      className={`${styles.modalOverlay} ${isCartSpecsModalOpen && styles.show} ${!isCartSpecsModalOpen && styles.slideOut
        }`}
    >
      <div className={styles.modalContent}>
        <div className={styles.topBar}>
          <p className={styles.totalPrice}>
            <strong>  Total: GHS{total?.totalPrice?.toFixed(2)}</strong>
          </p>

          <button className={styles.closeModal} onClick={closeCartModal}>
            <FaX className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.cartSpecs}>
          {cartBooks.map(book => (
            <CartCard selectedIds={selectedIds} setSelecetdIds={setSelecetdIds} key={book?._id} book={book} user={user} cart_id={book?._id} />
          ))}
        </div>
      </div>

      <div className={styles.cart__footer}>
        <div className={styles.footer__right}>
          <strong>GHS{total?.totalPrice?.toFixed(2)} </strong>
          <button onClick={handleOrder} className={styles.footer__button}>Order Now ( {total?.totalQuantity} )</button>
        </div>
      </div>
    </div>
  );
};

export default CartSpecsModal;