import React, { useContext } from 'react'
//import PropTypes from 'prop-types'
import FeedbackContext from '../context/FeedbackContext';


function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)
    //calculating average review
    let average = feedback.reduce((acc,cur)=>{
      return acc + cur.rating;        
    },0) / feedback.length
    average = average.toFixed(1).replace(/[.,]0$/,'')
    
  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {average ? average : 0}</h4>
    </div>
  )
}

// FeedbackStats.propTypes = {
//   feedback : PropTypes.array.isRequired
// }

export default FeedbackStats
