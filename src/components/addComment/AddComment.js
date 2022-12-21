import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useRef } from "react";

const AddComment = ({id}) => {
const {token} =  useContext(AuthContext);
const{comments, setComments} =useContext(AuthContext);
const commentRef = useRef();
const addcommentWithoutRefresh = (newComment) => {
  setComments([...comments, newComment])
}
const addNewComment = async() => {
  const res = await fetch('http://ferasjobeir.com/api/comments',
     {
      method: 'POST',
      body: JSON.stringify({
        "content": commentRef.current.value,
        "post_id": id,
      }),
      headers: {
          'Content-Type': 'application/json',
          Authorization :`Bearer ${token}`,
      }
  })
  const json = await res.json();
  console.log(json.data)
  if(json.success){
    setComments([...comments, json.data])
   // addcommentWithoutRefresh(json)
    console.log(comments)
    window.alert(json.messages)
    commentRef.current.value = ''
  }
  else{console.log(json.data)}
}

    return (
<div className="container-fluid addcomment">
          <div className="row">
            <div className="col-9 ps-0">
              <input
               ref={commentRef}
                type="text"
                className="form-control"
                placeholder="Add a new comment"
              />
            </div>
            <div className="col-3 p-0">
              <button onClick={()=>{addNewComment()}} className="btn btn-primary w-100">
                <small>Add</small>
              </button>
            </div>
          </div>
        </div>
     
 
      
      

    )
}

export default AddComment;