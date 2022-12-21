import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import dayjs from "dayjs";
import relativTime from "dayjs/plugin/relativeTime";
import './Comment.css';

const Comment = ({ comments }) => {
 
  console.log(comments);
  const convertDate = (date) => {
    dayjs.extend(relativTime);
    return dayjs(date).fromNow();
  };
  return (
    < >
      {comments?.map((comment, i) => (
       /*  <div className="comment" key={comment.id}> */
         
            <div key={i} className="comment">
            <img src={comment?.user?.avatar} alt="user Image" />
            <div>
              <div className="name"> {comment?.user.name}</div>
              <div className="mb-2 datetime">
                {" "}
                {convertDate(comment?.created_at)}
              </div>
              {comment?.content}
            </div>
            </div>
         
       /*  </div> */
      ))}

  
   
         
    </>
  );
};
export default Comment;
