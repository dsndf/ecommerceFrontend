import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productReview } from "../../slices/ProDetailSlice";
import "../../styles/Modal.scss";
import { toast } from "react-toastify";
const Modal = ({ closeModal }) => {
  const { id } = useParams();
  const [textArea, setTextArea] = useState("");
  const [rating, setRating] = useState(0);
  function getRating(newRating) {
    setRating(newRating);
  }
  const { userData ,isAuthenticated} = useSelector((state) => state.userReducer);
  const { name } = userData;
  
  const dispatch = useDispatch();
  const submitReview = () => {
     if(textArea === ""){
      toast.info("Review is required");
      return;
     }
     if(!isAuthenticated){
      toast.error("Please Login");
      return;
     }
    const myReview = new FormData();
    myReview.set("name", name);
    myReview.set("comment", textArea);
    myReview.set("rating", rating);
    dispatch(productReview(myReview, id));
    closeModal();
  };

  return (
    <>
      <div className="modal-wrapper"> </div>
      <div className="modal">

        <div className="main-review">
          <div>
            <h4>Rating:</h4>
            <ReactStars
              classNames={"star"}
              activeColor="rgb(238, 143, 42)"
              size={window.innerWidth < 600 ? 20 : 25}
              isHalf={true}
              color={"rgba(185, 185, 185, 0.47)"}
              onChange={getRating}
            ></ReactStars>
          </div>

          <div>
            <textarea
              placeholder="Type Something here... "
              value={textArea}
              id=""
              onChange={(e) => setTextArea(e.target.value)}
              cols="30"
              rows="30"
              required
            ></textarea>
          </div>
          <div className="modal-btn">
            <button onClick={closeModal} className="black-btn">Cancel</button>
            <button className="org-btn" onClick={submitReview}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
