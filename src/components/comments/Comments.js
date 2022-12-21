import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Comment from '../comment/Comment';
import './Comments.css';


const Comments = ({id}) => {
    const {token, addcommentWithoutRefresh} = useContext(AuthContext)
    const [comments, setComments] = useState([])

    const allComments = async (id) => {
        const response = await fetch(`http://ferasjobeir.com/api/posts/${id}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${token}`
            }
        })
        const json = await response.json()
        console.log(json.data?.comments)
       // console.log(comments)
        if(json.success) { 
            window.alert(json.messages)
            setComments([...comments,json?.data?.comments])
            console.log(`Comments array: ${comments}`)
        }
        else{console.log(json.data)}
    }

    useEffect(()=>{
    allComments(id) 
    },[addcommentWithoutRefresh])

    
    return (
      
                <div className='comments'>
                {comments?.map((comment,i) => (
                    
                        <Comment key={i} comments={comment}/>
                     
                    ))}
                </div>
       
    )
    
}
export default Comments;
