import React, { useEffect, useState } from "react";
import "../../styles/NewProduct.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, setCreateProductError, setIsCreated } from "../../slices/newProductSlice";
import SideBar from "../SideBar";

import { FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import { ImPriceTags } from "react-icons/im";
import { TbFileDescription } from "react-icons/tb";
import { STATUS } from "../../slices/productsSlice";
import Loader from "../Loader";
const NewProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { isCreated, status,err } = useSelector((state) => state.newProductReducer);

  const [newproData, setnewproData] = useState({
    name: "",
    description: "",
    stocks: "",
    price: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", newproData.name);
    myForm.set("description", newproData.description);
    myForm.set("stocks", newproData.stocks);
    myForm.set("price", newproData.price);
    myForm.set("category", newproData.category);
    for (let i of images) {
      myForm.append("images", i);
    }
    console.log(myForm);
    dispatch(createProduct(myForm));
  };

  const newProChangeHandler = (e) => {
    setnewproData({ ...newproData, [e.target.name]: e.target.value });
  };

  const proImagesHandler = (e) => {
    let files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    console.log(imagePreview);
    files.forEach((i) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => {
            console.log(old);
            return [...old, reader.result];
          });
          setImages((old) => {
            console.log(old);
            return [...old, reader.result];
          });
        }
      };
      reader.readAsDataURL(i);
    });
  };

  useEffect(() => {
    if(err){
      dispatch(setCreateProductError(""));
    }
    if (isCreated) {
      navigation("/admin/dashboard");
      dispatch(setIsCreated(false));
    }

  }, [isCreated,err]);

  return (
    <div className="new-main-cont admin-box">
      <form encType="multipart/form-data" onSubmit={submitHandler}>
        {status === STATUS.LOADING ? (
          <Loader />
        ) : (
          <>
            <h3>Create Product</h3>
            <div className="ipdiv">
              <input
                type="text"
                required
                name="name"
                placeholder="Product Name"
                value={newproData.name}
                onChange={newProChangeHandler}
              />
              <FaProductHunt />
            </div>
            <div className="ipdiv">
              <input
                type="number"
                required
                name="price"
                placeholder="Price"
                value={newproData.price}
                onChange={newProChangeHandler}
              />
              <ImPriceTags />
            </div>
            <div className="ipdiv">
              <input
                type="text"
                required
                name="category"
                placeholder="Category"
                value={newproData.category}
                onChange={newProChangeHandler}
              />
              <BiCategory />
            </div>
            <div className="ipdiv">
              {" "}
              <input
                type="number"
                required
                name="stocks"
                placeholder="Stocks"
                value={newproData.stocks}
                onChange={newProChangeHandler}
              />
              <AiOutlineStock />
            </div>
            <div className="ipdiv">
              <input
                type="text"
                required
                name="description"
                placeholder="Description"
                value={newproData.description}
                onChange={newProChangeHandler}
              />
              <TbFileDescription />
            </div>
            <div className="">
              <input
              required
                type="file"
                accept="image/*"
                multiple
                onChange={proImagesHandler}
              />
              {imagePreview.length > 0 && (
                <div className="product-imgs">
                  {imagePreview.length > 0
                    ? imagePreview.map((v, ind) => {
                        return (
                          <div className="">
                            <img src={v} key={ind} alt="product-image" />
                          </div>
                        );
                      })
                    : null}
                </div>
              )}
            </div>
            <input type="submit" value="Create" className="org-btn" />
          </>
        )}
      </form>{" "}
    </div>
  );
};

export default NewProduct;
