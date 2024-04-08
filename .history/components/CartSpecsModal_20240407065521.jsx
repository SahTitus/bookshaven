
import styles from "../../styles/CartSpecsModal.module.css";
import Image from "next/image";
import { generateUniqueId } from "@utils/generateId";
import { useStateContex } from "@redux/StateProvider";
import { addToCart, updateCartSpec } from "@actions/cartActions";
import { useAppDispatch } from "@redux/store";
import { disableIncBtn } from "@utils/disableSpecModalBtn";

const CartSpecsModal = ({
  closeModal,
  isModalOpen,
  btnClicked,
  product, user_id, cartProductId,
  isUpdateFromCartPage,
  cart_id,
  specifications
}) => {


  const { selectedOptions,
    selectedColor,
    selectedSize,
    addSelectedOption,
    updateQuantity,
    handleShippingMethodChange,
    totalQuantity,
    filteredSelectedOptions,
    setSelectedOptions,
    setIsOnlyCartSpec,
    shippingMethod
  } = useStateContex();

  const availableSpecs = product.specifications

  const cartData = {
    id: generateUniqueId(),
    user_id: user_id,
    product_id: product?._id,
    title: product?.title,
    // image: product?.image|| product?.images[0]?.url,
    stock: product.stock,
    quantity: product.quantity,
    prices: {
      unit_price: 0,
      total_price: 0,
    },
    checked: false,
    more_specs: filteredSelectedOptions.length > 1,
    specifications: filteredSelectedOptions,
    shipping_fee: 0,
    shippingMethod,
  };

  const dispatch = useAppDispatch();

  const newCartData = {
    user_id: user_id,
    product_id: product._id,
    cartProductId: cartProductId,
  }
  const newSpecQuantity = newCartData?.specifications?.quantity
  // handles adding to and updating cart
  const saveToCart = async () => {
    if (isUpdateFromCartPage) {
      dispatch(updateCartSpec(newCartData, cart_id));
    } else {
      dispatch(addToCart(cartData));
    }

    closeModal();
    setSelectedOptions([])
    setIsOnlyCartSpec(false)
  }

  const totalPrice = totalQuantity * parseFloat(product.price).toFixed(2);

  let disableBtn = disableIncBtn(
    specifications,
    newSpecQuantity,
    product.stock,
    isUpdateFromCartPage,
    newCartData.spec_id
  )

  return (
    <div
      className={`${styles.modalOverlay} ${btnClicked && styles.show} ${!isModalOpen && styles.slideOut
        }`}
    >
      <div className={styles.modalContent}>
        <div className={styles.topBar}>
          <div className={styles.imageWrapper}>
            <Image
              src={"/images/tower.png"}
              width={80}
              height={80}
              alt="carousel"
              className={styles.image}
            />
          </div>

          <p className={styles.totalPrice}>
            <strong>  Total: GHS{totalPrice?.toFixed(2)}</strong>
          </p>
        </div>
        <button className={styles.closeModal} onClick={closeModal}>
          <X className={styles.closeIcon} />
        </button>

        <div className={styles.cartSpecs}>



          <div className={styles.spec__container}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSpecsModal;