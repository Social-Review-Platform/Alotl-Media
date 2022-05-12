import React from "react";

export default function(props) {
  return (
    <div className='card'>
      <div className="card-title">{props.title}</div>
      <div className="desc-container">
        <span className="card-type">{props.type}</span>review by<span className="card-username">{props.username}</span>
      </div>
      <div className="card-review">{props.review}</div>
      <div className={`card-rating rating${props.rating}`}>{props.ratingStr}</div>
    </div>
  )
}



