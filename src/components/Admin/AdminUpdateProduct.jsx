import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, setIsCreated } from "../../slices/newProductSlice";
import { FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import { ImPriceTags } from "react-icons/im";
import { TbFileDescription } from "react-icons/tb";
import "../../styles/updateProduct.scss";
import SideBar from "../SideBar";
import {
  fetchProductDetails,
  setIsUpdated,
  setProductDetails,
  setProductDetailsError,
  updateProduct,
} from "../../slices/ProDetailSlice";
import { toast } from "react-toastify";
import { STATUS } from "../../slices/productsSlice";
import Loader from "../Loader";
const AdminUpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigation = useNavigate();
  const { product, err, isUpdated, status } = useSelector(
    (state) => state.productDetailReducer
  );

  const [updateData, setUpdateData] = useState({
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
    myForm.set("name", updateData.name);
    myForm.set("description", updateData.description);
    myForm.set("stocks", updateData.stocks);
    myForm.set("price", updateData.price);
    myForm.set("category", updateData.category);
    if (images.length > 0) {
      for (let i of images) {
        myForm.append("images", i);
      }
    }
    dispatch(updateProduct(id, myForm));
  };

  const updateChangeHandler = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
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
    if (product._id !== id) {
      dispatch(fetchProductDetails(id));
    } else {
      setUpdateData({
        name: product.name,
        stocks: product.stocks,
        description: product.description,
        price: product.price,
        category: product.category,
      });
      setImagePreview(product.images.map((v) => v.url));
    }
    if (isUpdated) {
      toast.success("Updation successfully done");
      dispatch(fetchProductDetails(id));
      dispatch(setIsUpdated(false));
     
      navigation('/admin/products')
    } else if (err) {
      toast.error(err);
      dispatch(setProductDetailsError(""));
    }
  }, [product, isUpdated, err]);

  return (
    <>
      <div className="main-cont  admin-box">
        <form encType="multipart/form-data" onSubmit={submitHandler}>
          {status === STATUS.LOADING ? (
            <Loader />
          ) : (
            <>
            
              <h3>Update Product</h3>
              <h1>{}</h1>
              <div className="ipdiv">
                <FaProductHunt />
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={updateData.name}
                  onChange={updateChangeHandler}
                />
              </div>
              <div className="ipdiv">
                <ImPriceTags />
                <input
                  type="number"
                  required
                  name="price"
                  placeholder="Price"
                  value={updateData.price}
                  onChange={updateChangeHandler}
                />
              </div>
              <div className="ipdiv">
                <BiCategory />
                <input
                  type="text"
                  required
                  name="category"
                  placeholder="Category"
                  value={updateData.category}
                  onChange={updateChangeHandler}
                />
              </div>
              <div className="ipdiv">
                <AiOutlineStock />
                <input
                  type="number"
                  required
                  name="stocks"
                  placeholder="Stocks"
                  value={updateData.stocks}
                  onChange={updateChangeHandler}
                />
              </div>
              <div className="ipdiv">
                <TbFileDescription />
                <input
                  type="text"
                  required
                  name="description"
                  placeholder="Description"
                  value={updateData.description}
                  onChange={updateChangeHandler}
                />
              </div>
              <div>
                {" "}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={proImagesHandler}
                />
                <div>
                  {imagePreview.length > 0 ? (
                    <div className="product-imgs">
                      {imagePreview.map((v, ind) => {
                        return (
                          <div className="img-box" key={ind}>
                            <img src={v} key={ind} alt="product-image" />
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
              <input
                type="submit"
                placeholder="Create"

                className={"org-btn"}
              />{" "}
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default AdminUpdateProduct;
