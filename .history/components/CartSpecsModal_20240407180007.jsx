
"use client"
import { useStateContex } from "@redux/StateProvider";
import styles from "../styles/CartSpecsModal.module.css";
import { FaX } from "react-icons/fa6";
import CartCard from "./cards/CartCard";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@lib/actions/cart.action";
import { useAppSelector } from "@redux/store";

const CartSpecsModal = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [itemsToDeleteIds, setItemsToDeleteIds]=useState([]);

  const {
    closeCartModal,
    isCartSpecsModalOpen, calculateTotalPrice, setShowLoaderOverlay, totalCartQnty, setTotalCartQnty,cartBooks, setCartBooks } = useStateContex();

    const totalPrice=calculateTotalPrice(itemsToDeleteIds);
const handleOrder =()=>{}

  useEffect(() => {
    const getCartItems = async () => {
      const data = await fetchCartItems(user?.id)
      setTotalCartQnty(data.totalItems)
  
      setCartBooks(data.data)

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
            <strong>  Total: GHS{totalPrice?.toFixed(2)}</strong>
          </p>

          <button className={styles.closeModal} onClick={closeCartModal}>
            <FaX className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.cartSpecs}>
          {cartBooks.map(book => (
            <CartCard itemsToDeleteIds={itemsToDeleteIds} setItemsToDeleteIds={setItemsToDeleteIds} key={book?._id} book={book} user={user} cart_id={book?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartSpecsModal;