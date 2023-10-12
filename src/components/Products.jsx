import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import ProductBox from "./ProductBox";
import "../styles/AllProducts.scss";
import { IoFilter } from "react-icons/io5";
import { GrClose } from "react-icons/gr";

import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { STATUS } from "../slices/productsSlice";
import ReactSlider from "react-slider";
import Pagination from "react-js-pagination";
import ReactStars from "react-rating-stars-component";
import ErrorCompo from "./ErrorCompo";
const Products = () => {
  const [price, setPrice] = useState([0, 5000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [state, setState] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [toggle, setToggle] = useState(false);
  const toggleFilter = () => {
    if (!toggle) {
      document.querySelector(".filterBox").style.transform = "translateX(0%)";
      document.body.style.overflowY = "hidden";
      setToggle(true);
    } else {
      document.querySelector(".filterBox").style.transform =
        "translateX(-100%)";
      document.body.style.overflowY = "visible";
      setToggle(false);
    }
  };

  let categories = ["Laptop", "Watch", "MiPhone", "RedmiPhone", "T-Shirt"];
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const { keyword } = useParams();

  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productReducer);
  const { products, resultPerPage, counts, availableProducts } = productsState;
  useEffect(() => {
    dispatch(
      fetchProducts(
        keyword,
        category !== "" ? 1 : currentPage,
        price,
        category,
        rating,
        sortBy
      )
    );
  }, [keyword, currentPage, price, category, rating, sortBy]);
  if (productsState.status == STATUS.ERROR) {
    return <ErrorCompo msg={productsState?.err} />;
  }
  return (
    <>
      <div className="sort-box" onChange={(e) => setSortBy(e.target.value)}>
        {window.outerWidth <= 768 ? (
          <IoFilter onClick={toggleFilter} />
        ) : (
          <span></span>
        )}
        <select name="" id="">
          <option value="">SORT BY</option>
          <option value="price">PRICE</option>
          <option value="name">NAME</option>
          <option value="rating">RATING</option>
        </select>
      </div>
      <div className="filter_Product">
        {!keyword ? (
          <div className="filterBox">
            {window.outerWidth <= 768 ? (
              <GrClose onClick={toggleFilter} />
            ) : null}
            <h3>Price</h3>

            <ReactSlider
              defaultValue={[price[0], price[1]]}
              className="slider"
              trackClassName="tracker"
              min={0}
              max={50000}
              minDistance={10}
              step={1000}
              pearling={true}
              withTracks={true}
              renderThumb={(props) => {
                return (
                  <div {...props} className="thumb">
                    {" "}
                  </div>
                );
              }}
              renderTrack={(props) => {
                return (
                  <div {...props} className="track">
                    {" "}
                  </div>
                );
              }}
              onChange={([min, max]) => {
                setPrice([min, max]);
              }}
            />

            <div>
              <h4>Low: ₹{price[0]}</h4>
              <h4>High: ₹{price[1]}</h4>
            </div>

            <div>
              <h3>Category</h3>
              <ul>
                <li
                  onClick={(e) => {
                    setCategory("");
                  }}
                >
                  All
                </li>
                {categories.map((v, ind) => {
                  return (
                    <li
                      className={state === ind + 1 ? "red" : null}
                      key={ind}
                      onClick={(e) => {
                        setCategory(v);
                        setState(ind + 1);
                      }}
                    >
                      {v}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3>Rating above:({rating})</h3>

              <ReactStars
                edit={true}
                onChange={(e) => {
                  setRating(e);
                }}
                value={rating}
                activeColor="rgb(238, 143, 42)"
                color={"rgba(185, 185, 185, 0.47)"}
                size={window.innerWidth < 600 ? 20 : 25}
                isHalf={true}
              ></ReactStars>
            </div>
          </div>
        ) : null}

        <div className="Allproducts">
          {productsState.status == STATUS.LOADING ? (
            <Loading></Loading>
          ) : products.length ? (
            products.map((v) => {
              return (
                <ProductBox
                  image={v.images[0]}
                  key={v._id}
                  id={v._id}
                  price={v.price}
                  name={v.name}
                  rating={v.rating}
                  numOfReviews={v.numOfReviews}
                  desc={v.desc}
                ></ProductBox>
              );
            })
          ) : (
            <h2 className="message">No Product Found!</h2>
          )}
        </div>
      </div>
      {resultPerPage < counts && availableProducts > resultPerPage ? (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={counts}
          nextPageText="Next"
          firstPageText="First"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          onChange={setCurrentPageNo}
        />
      ) : null}
    </>
  );
};

export default Products;
