import React, { useEffect} from "react";
import "../styles/homepage.scss";
import catg1 from "../images/category-1.jpg";
import catg2 from "../images/category-2.jpg";

import Loading from './Loading';
import catg3 from "../images/category-3.jpg";
import Heading from "./Heading";
import image1 from "../images/image1.png";
import ProductBox from "./ProductBox";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, fetchProducts } from "../slices/productsSlice";
import { motion } from "framer-motion";
import ErrorCompo from "./ErrorCompo.jsx";
const Homepage = () => {
  const dispatch = useDispatch();
  const { products, err, status } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  if (status === STATUS.ERROR) {
    return <ErrorCompo msg={err} />;
    
  }
  return (
    <div className="home-page-cont">
      <div className="ecom-banner">
        <div>
          {" "}
          <motion.h1
            initial={{
              transform: "scale(1.2)",

              opacity: 0,
            }}
            whileInView={{
              transform: "scale(1)",
              opacity: 1,
            }}
            transition={{
              duration: "0.7",
            }}
          >
            Give Your Workout <br />A New Style!
          </motion.h1>
          <motion.p
            initial={{
              x: "-100%",
              opacity: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            whileInView={{
              x: "0",
              opacity: 1,
            }}
          >
            Success isn'talways about greatness.It's about
            consistency.Consisitent hardwork gains success.Greatness will come.
          </motion.p>
          <a href="" className="expl-a">
            Explore
          </a>
        </div>
        <motion.div
          initial={{
            transform: "scale(1.1)",

            opacity: 0,
          }}
          whileInView={{
            transform: "scale(1)",
            opacity: 1,
          }}
          transition={{
            duration: "0.5",
          }}
        >
          <img src={image1} alt="" />
        </motion.div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="ecom-category">
        <img src={catg1} alt="" />
        <img src={catg2} alt="" />
        <img src={catg3} alt="" />
      </div>
      <br />
      <Heading text={"Featured Products"} />
      {
        status===STATUS.LOADING?<Loading/>: <div className="feature-pro-cont">
        {products &&
          products.map((v, ind) => {
            return (
              <ProductBox
                image={v.images[0]}
                key={ind}
                id={v._id}
                price={v.price}
                name={v.name}
                rating={v.rating}
                numOfReviews={v.numOfReviews}
                desc={v.desc}
              ></ProductBox>
            );
          })}
      </div>
      }

    </div>
  );
};

export default Homepage;
