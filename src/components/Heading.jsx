import React from "react";
import "../styles/Heading.scss";
const Heading = ({ text,id }) => {
  return (
    <div className="Heading" id={id}>
      {" "}
      <h3 >{text}</h3>
      <hr />
    </div>
  );
};

export default Heading;
