import { createContext,useState,useEffect} from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) =>{
    const [isLoading,setIsLoading] = useState(true)
    const [feedback,setFeedback] = useState([]);
    const [feedbackEdit,setFeedbackEdit] = useState({
        item:{},
        edit:false
    });

    useEffect(()=>{
      fetchFeedback();
      
    },[])
    //Fetch feedback
    const fetchFeedback = async() =>{
      const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`);
      const data = await response.json();
      setFeedback(data);
      setIsLoading(false)
    }
    
    //addFeedback
    const addFeedback = async (newFeedback) => {
      const response = await fetch(`http://localhost:5000/feedback`,{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(newFeedback)
      });
      const data = await response.json();
        setFeedback([data,...feedback])
    
      }
    
    //deleteFeedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete ?')) {

          await fetch(`http://localhost:5000/feedback/${id}`,{
            method:'DELETE'
          })
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
    const updateFeedback = async (id,newItem) =>{
      const response = await fetch(`http://localhost:5000/feedback/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(newItem)
      })

      const data = await response.json();
       setFeedback(feedback.map((item)=> (item.id === id ? {...item,...data}:item)));
    }

    return <FeedbackContext.Provider value={{feedback:feedback,deleteFeedback:deleteFeedback,addFeedback:addFeedback,editFeedback:editFeedback,feedbackEdit,updateFeedback,isLoading}}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;