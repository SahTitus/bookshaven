'use client'
import Image from "next/image";
import styles from "../../styles/CartCard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CartSpecsModal from "@components/modals/CartSpecsModal";
import { deleteCartObj, deleteCartSpec, updateCartSpec } from "@actions/cartActions";
import { useAppDispatch } from "@redux/store";
import { toggleSpecQuantity } from "@redux/features/cartSlice";
import { useStateContex } from "@redux/StateProvider";

import { ChevronDown, X } from "react-bootstrap-icons";

const CartCard = ({ product, cart_id, isLoading, newSpecValues, productsToDeleteIds, handleCardSelect }) => {
  const { setSelectedColor, setSelectedSize, setShippingMethod, setSelectedOptions, setIsOnlyCartSpec, } = useStateContex();

  const price = 3;

  const disableBtn = price === 0 || price < 0;

  const dispatch = useAppDispatch();
  const [isCartSpecsModalOpen, setIsCartSpecsModalOpen] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const [specToUpdateIndex, setSpecToUpdateIndex] = useState(null)

  const closeCartModal = () => {
    setIsCartSpecsModalOpen((prev) => !prev);
    setSelectedOptions([]);
  };

  let updatedProduct = product;
  const [dbProduct, setDbProduct] = useState({})

  const handleQuantityUpdates = (spec, change, index) => {
    dispatch(toggleSpecQuantity({ product_id: product.id, spec: spec, change: change, index: index }));

    setSpecToUpdateIndex(index)
  };


  useEffect(() => {
    // !loading - to prevent multiple requests
    if (newSpecValues.spec_id && !isLoading) {
      const newCartData = {
        user_id: product.user_id,
        product_id: product.product_id,
        cartProductId: product.id,
        spec_id: newSpecValues.spec_id,
        specifications: {
          quantity: newSpecValues.quantity,
        },
      }

      dispatch(updateCartSpec(newCartData, cart_id))
    }
    setSpecToUpdateIndex(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specToUpdateIndex])

  const getProduct = async () => {
    const res = await axios.get(`http://localhost:3000/api/products/${updatedProduct.product_id}`)
    setDbProduct(res.data);
  };

  const handleCartSpecsModal = async (spec) => {
    try {
      await getProduct();
    } catch (error) {
      console.log(error)
    }
    setShippingMethod(updatedProduct.shippingMethod)
    setSelectedSize(spec.size)
    setSelectedColor(spec.color)
    setIsOnlyCartSpec(true)
    setSelectedOptions([spec]);
    setIsCartSpecsModalOpen(true);
    setBtnClicked(true);
  };

  return (
    <div className={styles.cartCard__container}>
      <div className={styles.cartCard__wrapper}>
        <p onClick={() => handleCardSelect(updatedProduct.id)} className={styles.radio__wrapper}>
          {" "}
          <input
            readOnly
            checked={productsToDeleteIds.includes(updatedProduct.id)}
            id={styles.checkbox}
            type="radio" />
        </p>
        <div className={styles.cartCard__containerBox}>
          <div className={styles.cartCard}>
            <div className={styles.image__wrapper}>
              <Image
                src={"/images/bag.webp"}
                width={90}
                height={90}
                alt="carousel"
                className={styles.image}
              />
            </div>
            <div className={styles.cartCard__info}>
              <p className={styles.title}>
                {updatedProduct?.title}
              </p>
              <div onClick={() => handleCartSpecsModal(updatedProduct.specifications[0])} className={styles.extraInfo}>
                
                <span className={styles.shippingMtd}>{updatedProduct?.shippingMethod}</span>
              </div>
              <div className={styles.unitPrice__qntyBtn}>
                <p className={styles.unitPrice}>
                  GHS{updatedProduct?.prices?.unit_price}<span>/piece</span>
                </p>
                {!updatedProduct?.more_specs && (
                  <div className={styles.flexBottom}>
                    <div className={styles.quantityBtns}>
                      <button
                        disabled={disableBtn}
                        type="button"
                        className={`${styles.minus} ${disableBtn && styles.disableBtn}`}
                        onClick={() => handleQuantityUpdates(updatedProduct.specifications[0], -1, 0)}
                      >
                        <span className={styles.qntyIcons}>-</span>
                      </button>
                      <span className={styles.qnty}>{updatedProduct.specifications[0].quantity}</span>
                      <button onClick={() => handleQuantityUpdates(updatedProduct.specifications[0], 1, 0)} type="button" className={styles.plus}>
                        <span className={styles.qntyIcons}>+</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>


            </div>
          </div>

          {updatedProduct?.more_specs && (

            updatedProduct?.specifications?.map((spec, i) => (
              <div key={i} className={styles.cartCard__specs}>
                <div className={styles.specsTop}>
                  <div onClick={() => handleCartSpecsModal(spec)} className={styles.extraInfo}>
                    <span>{spec?.size} | {spec?.color}</span>
                    <ChevronDown />
                  </div>

                  <X className={styles.closeSpecCard} onClick={() => dispatch(deleteCartObj({ obj_ids: { pdt_id: product.id, spec_id: spec.id, product_ids: null } }, cart_id))} />
                </div>
                <div className={styles.specsBottom}>
                  <p className={styles.specTotalPrice}>GHS{spec?.spec_totalPrice}</p>
                  <div className={styles.quantityBtns}>
                    <button
                      disabled={disableBtn}
                      type="button"
                      className={`${styles.minus} ${disableBtn && styles.disableBtn
                        }`}
                      onClick={() => handleQuantityUpdates(spec, -1, i)}
                    >
                      <span className={styles.qntyIcons}>-</span>
                    </button>
                    <span className={styles.qnty}>{spec?.quantity}</span>
                    <button onClick={() => handleQuantityUpdates(spec, 1, i)} type="button" className={styles.plus}>
                      <span className={styles.qntyIcons}>+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))

          )}
          <div className={styles.totalPrice__container}>
            SubTotal:<p className={styles.subTotalPrice}>GHS{updatedProduct?.prices?.total_price}</p></div>
          <hr className={styles.divider} />

        </div>
      </div>
      <CartSpecsModal
        user_id={product.user_id}
        cartProductId={product.id}
        cart_id={cart_id}
        product={dbProduct}
        closeModal={closeCartModal}
        isModalOpen={isCartSpecsModalOpen}
        btnClicked={btnClicked}
        isUpdateFromCartPage={true}
        specifications={product.specifications}
      />
    </div>
  );
};

export default CartCard;
