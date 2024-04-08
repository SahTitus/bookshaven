
"use client"
import { useStateContex } from "@redux/StateProvider";
import styles from "../styles/CartSpecsModal.module.css";
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import CartCard from "./cards/CartCard";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@lib/actions/cart.action";
import { useAppSelector } from "@redux/store";
// import { addToCart, updateCartSpec } from "@actions/cartActions";
// import { useAppDispatch } from "@redux/store";
// import { disableIncBtn } from "@utils/disableSpecModalBtn";

const CartSpecsModal = () => {
  const { user } = useAppSelector((state) => state.auth);

  const {
    closeCartModal,
    isCartSpecsModalOpen, setShowLoaderOverlay, totalCartQnty, setTotalCartQnty,cartBooks, setCartBooks } = useStateContex();

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



  // const handleFetchCartItems = async (user) => {
  //   try {
  //     // const

  //     setShowLoaderOverlay(false);

  //   } catch (error) {
  //     setShowLoaderOverlay(false);
  //     handleError(`POST-UPDATE book ERR:${error}`)
  //   }
  // };



  // const availableSpecs = product.specifications

  // const cartData = {
  //   id: generateUniqueId(),
  //   user_id: user_id,
  //   product_id: product?._id,
  //   title: product?.title,
  //   // image: product?.image|| product?.images[0]?.url,
  //   stock: product.stock,
  //   quantity: product.quantity,
  //   prices: {
  //     unit_price: 0,
  //     total_price: 0,
  //   },
  //   checked: false,
  //   more_specs: filteredSelectedOptions.length > 1,
  //   specifications: filteredSelectedOptions,
  //   shipping_fee: 0,
  //   shippingMethod,
  // };

  // const dispatch = useAppDispatch();

  // const newCartData = {
  //   user_id: user_id,
  //   product_id: product._id,
  //   cartProductId: cartProductId,
  // }
  // const newSpecQuantity = newCartData?.specifications?.quantity
  // // handles adding to and updating cart
  // const saveToCart = async () => {
  //   if (isUpdateFromCartPage) {
  //     dispatch(updateCartSpec(newCartData, cart_id));
  //   } else {
  //     dispatch(addToCart(cartData));
  //   }

  //   closeModal();
  //   setSelectedOptions([])
  //   setIsOnlyCartSpec(false)
  // }

  return (
    <div
      className={`${styles.modalOverlay} ${isCartSpecsModalOpen && styles.show} ${!isCartSpecsModalOpen && styles.slideOut
        }`}
    >
      <div className={styles.modalContent}>
        <div className={styles.topBar}>
          <p className={styles.totalPrice}>
            <strong>  Total: GHS{9999?.toFixed(2)}</strong>
          </p>

          <button className={styles.closeModal} onClick={closeCartModal}>
            <FaX className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.cartSpecs}>
          {cartBooks.map(book => (
            <CartCard key={book?._id} book={book} cart_id={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartSpecsModal;