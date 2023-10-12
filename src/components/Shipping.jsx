import React from "react";
import "../styles/Shipping.scss";  
import { Country, State} from "country-state-city";
import StepperCompo from "./StepperCompo";
import { FaHome, FaCity} from "react-icons/fa";
import {  ImLocation } from "react-icons/im";
import { MdPhone } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import { MdOutlineFollowTheSigns } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShippingInfo } from "../slices/cartSlice";
import { toast } from "react-toastify";

const Shipping = () => {
  const navigation = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cartReducer);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [address, setAddress] = useState(shippingInfo.address);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);
  const [city, setCity] = useState(shippingInfo.city);
  const dispatch = useDispatch();
  const getShippingInfo = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      toast.error("phoneNumber number must have 10 digits", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    dispatch(
      setShippingInfo({ country, state, city, address, pincode, phoneNumber })
    );
    navigation("/order/confirm");
  };

  return (
    <div className="shipping">
 <StepperCompo step={0} />
      <div className="shippingBox">
        {/* <SmallHeading text={"Shipping Details..."}></SmallHeading> */}
        <form action="" className="shippingForm" onSubmit={getShippingInfo}>
   
         <h3 style={{margin:"15px"}} >Shipping Details</h3>
            <div className="ipdiv">
              <FaHome />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div  className="ipdiv">
              <FaCity />
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="ipdiv">
              <ImLocation />
              <input
                type="number"
                name="pincode"
                placeholder="Pincode"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
        

              
            <div className="ipdiv">
              <MdPhone />
              <input
                type={"number"}
                name="phoneNumber"
                placeholder="Mobile Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="ipdiv">
              <GoGlobe />
              <select
                required
                name="country"
                id=""
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country.getAllCountries().map((v, ind) => {
                  return (
                    <option key={ind} value={v.isoCode}>
                      {v.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {country ? (
              <div className="ipdiv">
                <MdOutlineFollowTheSigns />
                <select
                  required
                  name="country"
                  id=""      value={state}
            
                  onChange={(e) => setState(e.target.value)}
                >
                <option  selected  value={""}>State</option>
                  {State.getStatesOfCountry(country).map((v, ind) => {
                    return (
                      <option key={ind} value={v.name}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : null}
            <button className="org-btn" type="submit">
              Continue
            </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
