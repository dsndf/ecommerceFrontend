import React from 'react'
import { IoFilter } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
const Filter = () => {
  return (
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
            //  window.location.assign('/products

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
  )
}

export default Filter
