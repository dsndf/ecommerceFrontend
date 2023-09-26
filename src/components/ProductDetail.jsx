import React, { useMemo } from "react";
import Heading from "./Heading";
import NotFound from "./NotFound";
import { useEffect } from "react";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { BiHeart } from "react-icons/bi";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import {
  fetchProductDetails,
  setIsReviewed,
  setProductDetailsError,
} from "../slices/ProDetailSlice";
import { STATUS } from "../slices/productsSlice";
import Loading from "./Loading";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { setCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import "../styles/ProductDetail.scss";
import Modal from "./ReviewModal/Modal";
import Main from "./Slider/Main";
import AddToCartModal from "./AddToCartModal";
import { removewishListItems, setwishList } from "../slices/wishListSlice";
import WishList from "./WishList";
import ReviewBox from "./ReviewBox";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import { AiFillHeart } from "react-icons/ai";
const server = process.env.REACT_APP_BACKEND_URL;
const ProductDetail = () => {
  const [cartModalState, setCartModalState] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(false);
  const [wLToggle, setWlToggle] = useState(false);
  const cartState = useSelector((state) => state.cartReducer);
  const { wishList } = useSelector((state) => state.wishListReducer);
  const { cart } = cartState;
  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetailReducer);
  
  const { isReviewed ,err } = productDetails;
  function openModal(e) {
    document.body.style.overflowY = "hidden";
    setModal(true);
  }
  function itemInWishList(id){
    return wishList.some((v)=>v.product===id);
  }
  function closeModal(e) {
  setModal(false);
    document.body.style.overflowY = "scroll";
  }
  async function getRelatedProducts(id) {
    setLoading(true);
    const { data } = await axios.get(`${server}/related/products/${id}`);

    setRelatedProducts(data.products);
    setLoading(false);
  }

  const {
    rating,
    stocks,
    description,
    name,
    price,
    numOfReviews,
    images,
    reviews,
  } = productDetails.product;

  const dispatch = useDispatch();

  const addToWL = () => {
    let obj = {
      name,
      product: id,
      price,
      image: images[0],
    };

    dispatch(setwishList(obj));
    setWlToggle(true);
  };
  const addToCart = () => {
    let product = {
      name,
      product: id,
      price,
      image: images[0],
      stocks,
      quantity,
    };

    dispatch(setCart(product));
    toast.success("Item has been added to cart");
    setCartModalState(true);
  };

  let inCart = useMemo(() => {
    const getproduct = cart.find((v) => {
      return v.product === id;
    });
    if (!getproduct) {
      return false;
    }
    return true;
  }, [cart.length]);

  useEffect(() => {
    if (isReviewed) {
      toast.success("Your review has been submitted");
      dispatch(setIsReviewed(false));
    }
    dispatch(fetchProductDetails(id));
    getRelatedProducts(id);
  }, [isReviewed]);

  if (productDetails.status === STATUS.LOADING) {
    return <Loading></Loading>;
  }
 if(productDetails.status === STATUS.ERROR && err === "Product not found"){
  return <NotFound/>
 }
  return (
    <div>
      {cartModalState ? (
        <AddToCartModal
          close={() => {
            console.log(document.getElementById("cartid"));
            document.getElementById("cartid").classList.add("close-class");
            setTimeout(() => {
              setCartModalState(false);
            }, 400);
          }}
        />
      ) : null}
      {wLToggle ? (
        <WishList
          close={() => {
            console.log(document.getElementById("cartid"));
            document.getElementById("wishListid").classList.add("close-class");
            setTimeout(() => {
              setWlToggle(false);
            }, 400);
          }}
        />
      ) : null}
      {modal ? <Modal closeModal={closeModal} /> : null}
      <div className="productDetailContainer" id="product-container">
        <div className="detailbox">
          <Main
            data={images ? images : []}
            mainHeight={window.innerWidth <= 768 ? "400px" : "800px"}
            mainWidth={"45%"}
            imgWidth={"auto"}
          />

          <div className="details">
            <h1>{name}</h1>

            <div>
              <ReactStars
                edit={false}
                activeColor="rgb(238, 143, 42)"
                size={window.innerWidth < 600 ? 20 : 25}
                value={rating}
                color={"rgb(185 185 185 / 47%)"}
                isHalf={true}
              ></ReactStars>
              <small>({numOfReviews} Reviews)</small>
            </div>
            <div>
              <h2
                className="price"
                style={{
                  paddingTop: "10px",
                  paddingBottom: "15px",
                }}
              >
                ₹{price}.00
              </h2>
              <div className="cartBox">
                <div className="quantity">
                  <button
                    className="minusbtn"
                    onClick={() => {
                      if (quantity - 1 < 1) {
                        return;
                      } else {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <GrSubtract />
                  </button>
                  <input value={quantity} type="number" readOnly />
                  <button
                    id="qty-btn"
                    onClick={() => {
                      if (quantity >= stocks) {
                        return;
                      } else {
                        setQuantity(quantity + 1);
                      }
                    }}
                    className="addbtn"
                  >
                    <GrAdd />
                  </button>
                </div>
                {inCart === true ? (
                  <button
                    className="InCart "
                    onClick={() => setCartModalState(true)}
                  >
                    <p>
                      IN CART
                      <BsFillCartCheckFill />
                    </p>
                  </button>
                ) : (
                  <button
                    className="web-btn4"
                    onClick={addToCart}
                    disabled={stocks > 0 ? false : true}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
            <div className="pro-watch-list">
              <p>Add to WishList</p>
              {
                 itemInWishList(id)?<AiFillHeart style={{fill:"#f83e3e"}} onClick={()=>dispatch(removewishListItems(id))} />:<BiHeart onClick={addToWL} />
              }
              
            </div>
            <p>
              Status:
              <span className={stocks > 0 ? "green" : "red"}>
                {stocks > 0 ? " InStock" : "Out of Stock"}
              </span>
            </p>

            <h3>Description :</h3>
            <h5>{description}</h5>

            <button className="black-btn" onClick={openModal}>
              Give Review
            </button>
          </div>
        </div>
      </div>
      <Heading text={"Reviews"}></Heading>
      {reviews?.length !== 0 ? (
        <section className="review-sec">
          {reviews &&
            reviews.map((v, ind) => {
              return (
                <ReviewBox
                  key={ind}
                  name={v?.name}
                  rating={v?.rating}
                  review={v?.comment}
                  avatar={v.avatar}
                />
              );
            })}
        </section>
      ) : (
        <h2 style={{ color: "grey", textAlign: "center" }}>
          No Reviews Found!
        </h2>
      )}

      <Heading text={"Related Products"}></Heading>
      {!loading && relatedProducts.length ? (
        <section className="related-products">
          {!loading &&
            relatedProducts.map((e, ind) => (
              <RelatedProduct
                key={ind}
                id={e._id}
                rating={e.rating}
                name={e.name}
                price={e.price}
                url={e?.images?.[0]?.url}
              />
            ))}
        </section>
      ) : (
        <section style={{ height: "200px" }}>
          {loading && <Loader style={{ flexDirection: "row" }} />}
          {!loading && relatedProducts.length === 0 && (
            <h2 style={{ color: "grey", textAlign: "center" }}>
              No Related Product Found!
            </h2>
          )}
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
