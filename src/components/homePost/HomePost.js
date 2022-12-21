import "./HomePost.css";
import dayjs from "dayjs";
import relativTime from "dayjs/plugin/relativeTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useContext } from "react";
import Comments from "../comments/Comments";
import { AuthContext } from "../../contexts/AuthContext";
import AddComment from "../addComment/AddComment";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import FormControlLabel from '@mui/material/FormControlLabel';


const HomePost = ({ data, allPosts, changePosts }) => {
  const [showComment, setShowComment] = useState(false);
  const { comments, token, setComments } = useContext(AuthContext);
  
  const likes = ['unlike', 'like']
  //To convert Time to words
  const convertDate = (date) => {
    dayjs.extend(relativTime);
    return dayjs(date).fromNow();
  };
  //End
  const putLikeOrDislike = async (data) => {
    const response =  await fetch(`http://ferasjobeir.com/api/posts/${data.liked_by_current_user? 'unlike': 'like'}`,
    {
      method: 'POST',
      body: JSON.stringify(
        {post_id:data.id}),
        headers: {
          'Content-Type': 'application/json',
          Authorization :`Bearer ${token}`,
        }
        });
        const json = await response.json();
        console.log(json.data.liked_by_current_user)
        if(json.success){
        const  newPosts = [...allPosts]
        const index = newPosts.findIndex(item=>item.id == json.data.id)
        newPosts[index] = json.data
        changePosts(newPosts)
            window.alert(json.messages)
        }
}


  return (
    <>
      <div className="single-post">
        <div className="postContent">
          <img src={data?.user?.avatar} width="40px" alt="user image"></img>
          <div>
            <div className="mb-0 name">{data?.user?.name}</div>
            <div className="mb-2 datetime">{convertDate(data?.created_at)}</div>
            <p> {data?.content}</p>

            <div className="icons d-flex align-items-center">
              <div className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center" onClick={()=>putLikeOrDislike(data)}>
              {
            data.liked_by_current_user?<Favorite sx={{color:"red"}} />: <FavoriteBorder/>
             }
             
                <div className="ms-2 fw-bolder">{data?.likes_count} </div>
              </div>

              <div className="border rounded border bg-light py-1 px-2 d-flex align-items-center">
                <ChatBubbleOutlineIcon
                  onClick={() => {
                    setShowComment(!showComment);
                  }}
                />

                <div className="ms-2 fw-bolder">{data?.comments_count} </div>
              </div>
            </div>
            {showComment && (
                <>
              
              <div className="postContent">
                <Comments id={data?.id} />
               
              </div>
               <AddComment id={data?.id} />
               </>
            )}
          </div>
        </div>
      </div>
    </>
  )

            }
export default HomePost;
