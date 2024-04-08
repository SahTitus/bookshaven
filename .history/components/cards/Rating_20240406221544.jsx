"use client"
import React, { useState } from "react";

const Rating = () => {
    const [ratings, setRatings] = useState(Array(5).fill(0.0));

    const handleRating = (index) => {
        const updatedRatings = ratings?.map((rating, i) => {
          if (i <= index) {
            return i === index ? Math.round((rating + 0.5) * 10) / 10 : 1.0;
          } else {
            return 0.0;
          }
        });
      
        setRatings(updatedRatings);
        // const updatedRatings = [...ratings];
        // updatedRatings.fill(1, 0, index + 1); // Fill the array with 1s up to the selected index
        // updatedRatings.fill(0, index + 1); // Reset the array from the selected index onwards
        // setRatings(updatedRatings);
      };
  return (
    <div>
      {ratings?.map((rating, index) => {
        const fillPercentage = rating * 100;
        const starStyle = {
          cursor: "pointer",
          display: "inline-block",
          width: "1em",
          overflow: "hidden",
          position: "relative",
        };
        const fillStyle = {
          position: "absolute",
          top: 0,
          left: 0,
          width: `${fillPercentage}%`,
          overflow: "hidden",
          whiteSpace: "nowrap",
          color: 
        };
        const emptyStyle = {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          color:"#f7f7ff7"
        };

        return (
          <span
            key={index}
            onClick={() => handleRating(index)}
            style={starStyle}
          >
            <span className={fillStyle}>★</span>
            <span className={emptyStyle}>☆</span>
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
