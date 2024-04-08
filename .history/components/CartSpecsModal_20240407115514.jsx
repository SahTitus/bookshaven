
"use client"
import { useStateContex } from "@redux/StateProvider";
import styles from "../styles/CartSpecsModal.module.css";
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import CartCard from "./cards/CartCard";
// import { addToCart, updateCartSpec } from "@actions/cartActions";
// import { useAppDispatch } from "@redux/store";
// import { disableIncBtn } from "@utils/disableSpecModalBtn";

const CartSpecsModal = () => {


  const {
    setShowAuthForm, toggleShowAuthForm, openCartSpecsModal,
    closeCartModal,
    isCartSpecsModalOpen } = useStateContex();
    const handleFetchCartItems = (user) => {
        console.log(values)
        setSubmissionStatus('loading');
        // setShowLoaderOverlay(true);
    
        const user_id = 'uuuuuuuuu';
        try {


          setShowLoaderOverlay(false);
    
        } catch (error) {
          setShowLoaderOverlay(false);
          setSubmissionStatus('error');
          handleError(`POST-UPDATE book ERR:${error}`)
        }
      };

  const books = [
    {
      _id: '4twreeeeeeo6oh0hh09h',
      "title": "To Kill a Mockingbird",
      "slug": "to-kill-a-mockingbird",
      "description": "A classic novel by Harper Lee.",
      "author_firstName": "Harper",
      "author_lastName": "Lee",
      "genre": "Fiction",
      "genre_id": "fiction",
      "ISBN": "9780061120084",
      "price": 10.99,
      "availability": "In Stock",
      "category": "Classic",
      "category_id": "classic",
      "image": "https://picsum.photos/200/300?random=1",
      "pages": [280],
      "bookmarks": [],
      "publishedAt": "1960-07-11",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
    {
      _id: '4twreeeoh0hh09h',
      "title": "1984",
      "slug": "1984",
      "description": "A dystopian novel by George Orwell.",
      "author_firstName": "George",
      "author_lastName": "Orwell",
      "genre": " Fiction",
      "genre_id": "science-fiction",
      "ISBN": "9780451524935",
      "price": 9.99,
      "availability": "In Stock",
      "category": "Dystopian",
      "category_id": "dystopian",
      "image": "https://picsum.photos/200/300?random=2",
      "pages": [328],
      "bookmarks": [],
      "publishedAt": "1949-06-08",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
    {
      _id: '4twrohfefeee0hh09h',
      "title": "Pride and Prejudice",
      "slug": "pride-and-prejudice",
      "description": "A romantic novel by Jane Austen.",
      "author_firstName": "Jane",
      "author_lastName": "Austen",
      "genre": "Romance",
      "genre_id": "romance",
      "ISBN": "9780141439518",
      "price": 8.99,
      "availability": "In Stock",
      "category": "Classic",
      "category_id": "classic",
      "image": "https://picsum.photos/200/300?random=3",
      "pages": [432],
      "bookmarks": [],
      "publishedAt": "1813-01-28",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
    {
      _id: '4twrofgh0hh09h',
      "title": "The Great Gatsby",
      "slug": "the-great-gatsby",
      "description": "A novel by F. Scott Fitzgerald.",
      "author_firstName": "F. Scott",
      "author_lastName": "Fitzgerald",
      "genre": "Fiction",
      "genre_id": "fiction",
      "ISBN": "9780743273565",
      "price": 7.99,
      "availability": "In Stock",
      "category": "Classic",
      "category_id": "classic",
      "image": "https://picsum.photos/200/300?random=4",
      "pages": [180],
      "bookmarks": [],
      "publishedAt": "1925-04-10",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
    {
      _id: '4twrohww0hh09h',
      "title": "The Hobbit",
      "slug": "the-hobbit",
      "description": "A fantasy novel by J.R.R. Tolkien.",
      "author_firstName": "J.R.R.",
      "author_lastName": "Tolkien",
      "genre": "Fantasy",
      "genre_id": "fantasy",
      "ISBN": "9780547928227",
      "price": 11.99,
      "availability": "In Stock",
      "category": "Classic",
      "category_id": "classic",
      "image": "https://picsum.photos/200/300?random=5",
      "pages": [304],
      "bookmarks": [],
      "publishedAt": "1937-09-21",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
    {
      _id: '4twroh0hh9909h',
      "title": "Harry Potter and the Philosopher's Stone",
      "slug": "harry-potter-and-the-philosophers-stone",
      "description": "The first novel in the Harry Potter series by J.K. Rowling.",
      "author_firstName": "J.K.",
      "author_lastName": "Rowling",
      "genre": "Fantasy",
      "genre_id": "fantasy",
      "ISBN": "9781408855652",
      "price": 12.99,
      "availability": "In Stock",
      "category": "Children's",
      "category_id": "childrens",
      "image": "https://picsum.photos/200/300?random=6",
      "pages": [352],
      "bookmarks": [],
      "publishedAt": "1997-06-26",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    },
    {
      _id: '4twroh0hh09h',
      "title": "The Catcher in the Rye",
      "slug": "the-catcher-in-the-rye",
      "description": "A novel by J.D. Salinger.",
      "author_firstName": "J.D.",
      "author_lastName": "Salinger",
      "genre": "Fiction",
      "genre_id": "fiction",
      "ISBN": "9780316769488",
      "price": 6.99,
      "availability": "In Stock",
      "category": "Classic",
      "category_id": "classic",
      "image": "https://picsum.photos/200/300?random=7",
      "pages": [224],
      "bookmarks": [],
      "publishedAt": "1951-07-16",
      "modifiedAt": "2024-04-06T12:00:00.000Z"
    }
  ]



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
          {books.map(book => (
            <CartCard key={book?._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartSpecsModal;