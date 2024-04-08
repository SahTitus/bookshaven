
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
    spec_id: filteredSelectedOptions[0]?.id,
    specifications: filteredSelectedOptions[0],
    shippingMethod,
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
          <div className={styles.topBar__info}>
            <p>
              <strong>GHS{product.price}</strong> <span>{shippingMethod}</span>
            </p>
            <p className={styles.totalQnty}>
              SubTotal: ({selectedOptions.length} type {totalQuantity} items)
            </p>
            <p>MOQ: {product.moq} pieces</p>
          </div>
          <p className={styles.totalPrice}>
            <strong>  Total: GHS{totalPrice?.toFixed(2)}</strong>
          </p>
        </div>
        <button className={styles.closeModal} onClick={closeModal}>
          <X className={styles.closeIcon} />
        </button>

        <div className={styles.cartSpecs}>
          {availableSpecs?.color?.length > 0 && (
            <div className={styles.spec__container}>
              <p className={styles.spec__caption}>Color:</p>
              <div className={styles.spec__option}>
                {availableSpecs?.color?.map((color, i) => (
                  <p
                    key={i}
                    onClick={() => addSelectedOption(color, selectedSize)}
                    style={{
                      backgroundColor:
                        selectedColor === color ? "#f60" : "transparent",
                      color: selectedColor === color ? "#fff" : "inherit",
                    }}
                  >
                    {color}
                  </p>
                ))}
              </div>
            </div>
          )}

          {availableSpecs?.size?.length > 0 && (
            <div className={styles.spec__container}>
              <p className={styles.spec__caption}>Size:</p>
              <div className={`${styles.spec__option} ${styles.size}`}>
                {availableSpecs?.size?.map((size, i) => (
                  <p
                    key={i}
                    onClick={() => addSelectedOption(selectedColor, size)}
                    style={{
                      backgroundColor:
                        selectedSize === size ? "#f60" : "transparent",
                      color: selectedSize === size ? "#fff" : "inherit",
                    }}
                  >
                    {size}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className={styles.spec__container}>
            <p className={styles.spec__caption}>Quantity:</p>
            <div className={`${styles.spec__counter}`}>
              <p>
                <button
                  onClick={() =>
                    updateQuantity(selectedColor, selectedSize, -1, product.stock)
                  }
                  className={selectedOptions.find(
                    (option) =>
                      option.color === selectedColor &&
                      option.size === selectedSize
                  )?.quantity === 0 ? styles.disabled : ""}
                >
                  -
                </button>{" "}
                {selectedOptions?.find(
                  (option) =>
                    option?.color === selectedColor &&
                    option?.size === selectedSize
                )?.quantity || 0}{" "}
                <button
                  disabled={disableBtn}
                  onClick={() =>
                    updateQuantity(selectedColor, selectedSize, 1, product.stock)
                  }
                  className={selectedOptions?.find(
                    (option) =>
                      option?.color === selectedColor &&
                      option?.size === selectedSize
                  )?.quantity === product?.stock ? styles.disabled : ""}
                >
                  +
                </button>{" "}
                {disableBtn ? `only ${product?.stock} are available` : ''}
              </p>
            </div>
          </div>

          <div className={styles.spec__container}>
            <p className={styles.spec__caption}>Shipping Method:</p>
            <div className={styles.spec__option}>
              <p
                onClick={() => handleShippingMethodChange("By Air")}
                style={{
                  backgroundColor:
                    shippingMethod === "By Air" ? "#f60" : "transparent",
                  color: shippingMethod === "By Air" ? "#fff" : "inherit",
                }}
              >
                By Air
              </p>
              <p
                onClick={() => handleShippingMethodChange("By Sea")}
                style={{
                  backgroundColor:
                    shippingMethod === "By Sea" ? "#f60" : "transparent",
                  color: shippingMethod === "By Sea" ? "#fff" : "inherit",
                }}
              >
                By Sea
              </p>
            </div>
          </div>

          <div className={styles.confirmBtn}>
            <button onClick={saveToCart} disabled={totalQuantity === 0} type="button">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSpecsModal;