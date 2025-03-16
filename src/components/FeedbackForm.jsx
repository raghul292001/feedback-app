import React, { useContext, useState,useEffect } from "react";
import RatingSelect from './RatingSelect';
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message,setMessage] = useState("");
  const {addFeedback,feedbackEdit,updateFeedback} = useContext(FeedbackContext);

  useEffect(()=>{
    if(feedbackEdit.edit === true) {
        setBtnDisabled(false);
        setReviewText(feedbackEdit.item.text);
        setRating(feedbackEdit.item.rating);
    }
  },[feedbackEdit])

  const handleTextChange = (e) => {
    if(reviewText === '') {
        setBtnDisabled(true)
        setMessage(null)
    }else if (reviewText !== '' && reviewText.trim().length <= 10) {
        setMessage("Text must be at least 10 char")
        setBtnDisabled(true)
    }else{
        setBtnDisabled(false)
        setMessage(null)
    }
    setReviewText(e.target.value);
  };
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(reviewText.trim().length > 10) {
        const newFeedback = {
            text:reviewText,
            rating
        }
    if(feedbackEdit.edit === true){
        updateFeedback(feedbackEdit.item.id,newFeedback)
    }else {
        addFeedback(newFeedback);
    }
        setReviewText('');
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us ?</h2>
        <RatingSelect setRating ={setRating} rating={rating}/>
        <div className="input-group">
          <input
            onChange={handleTextChange}
            value={reviewText}
            type="text"
            placeholder="Write a review"
          />
          <Button type="submit" version="secondary" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div> }
      </form>
    </Card>
  );
}

export default FeedbackForm;
