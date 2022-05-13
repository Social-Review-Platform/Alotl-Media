import React from "react";

export default function(props) {
  // console.log(props.username);
  // console.log(props.loggedInUsername);

  console.log(props);
  const deleteFetch = () => {
    fetch('/api/review/delete', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: props._id})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location.href = window.location.href;
    });
  }

  if (!props){
    return (<div></div>)
  } else {
    if (props.username === props.loggedInUsername){
      return (
        <div className='card'>
          <div className="card-title">{props.title}</div>
          <div className="desc-container">
            <span className="card-type">{props.type}</span>review by<span className="card-username">{props.username}</span>
          </div>
          <div className="card-review">{props.review}</div>
          <div className={`card-rating rating${props.rating}`}>{props.ratingStr}</div>
          <button className="delete-button" onClick="">🖊️ </button>
          <button className="update-button" onClick={deleteFetch}>❌ </button>
        </div>
      )
    } else {
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
    

  }
}



