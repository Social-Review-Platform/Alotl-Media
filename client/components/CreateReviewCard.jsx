import React from "react";

export default function(props) {
  return (
    <div className='review-creator-container'>

        <form className="review-creator" method="POST" action='/api/review/createreview'>
          <input type="hidden" name="user_id" value={props.user_id}></input>
          <select name="type" required>
            <option value="" defaultValue>Choose a Media Type</option>
            <option value="Movie">Movie</option>
            <option value="Book">Book</option>
            <option value="Music">Music</option>
          </select>
          <input type="text" placeholder="Title" name="title" required />
          <textarea placeholder="Enter a short review! " rows="5" name="review" required ></textarea>
          <div className="did-you-like-it">Did you like it alotl?</div>
          <div className="rating-container">
            <div className="toggle-radio">
              <input type="radio" name="rating" id="yes" value={1} defaultChecked />
              <input type="radio" name="rating" id="no" value={0}/>
              <div className="switch">
                <label htmlFor="yes">YES</label>
                <label htmlFor="no">NO</label>
                <span></span>
              </div>
            </div>
            <input type="submit" value="Submit" />
          </div>
        </form>

    </div>
  )
}


