import { createContext,useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import FeedbackData from "../data/FeedbackData";


const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) =>{
    const [feedback,setFeedback] = useState(FeedbackData);
    const [feedbackEdit,setFeedbackEdit] = useState({
        item:{},
        edit:false
    });
    
    //addFeedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([...feedback, newFeedback])
    
      }
    
    //deleteFeedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete ?')) {
          setFeedback(feedback.filter((item) => item.id !== id))
        }
      }
    
    //editFeedback
    const editFeedback = (item) =>{
        setFeedbackEdit({
            item,
            edit:true
        })
    }

    //updateFeedback
    const updateFeedback = (id,newItem) =>{
       setFeedback(feedback.map((item)=> (item.id === id ? {...item,...newItem}:item)));
    }

    return <FeedbackContext.Provider value={{feedback:feedback,deleteFeedback:deleteFeedback,addFeedback:addFeedback,editFeedback:editFeedback,feedbackEdit,updateFeedback}}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;