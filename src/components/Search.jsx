import React, { useState } from "react";
import "../styles/Search.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import { GrClose } from "react-icons/gr";
const Search = ({ closeSearch }) => {
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const changeHandler = (e) => {
    setKeyword(e.target.value);
  };
  const clickHandler = (e) => {
    e.preventDefault();
    console.log("hii");
    if (keyword.trim()) {
      navigation(`/products/${keyword}`);
    } else {
      navigation("/products");
    }
  };


  useEffect(()=>{
return ()=>{

  document.body.style.overflowY="scroll";
}
  },[])
  return (
    <>
      {" "}
      <div className="modal-wrapper"></div>
      <div className="searchcontainer" id="search">
        <GrClose onClick={closeSearch} />
        <button type="submit" className="org-btn" onClick={clickHandler}>
          <h3>Search</h3>
        </button>
        <div>
          <input
            type="text"
            name="name"
            value={keyword}
            placeholder="Search a Product..."
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
