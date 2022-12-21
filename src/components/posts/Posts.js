import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import "./Posts.css";

const Posts = ({ posts, counter, setCounter}) => {
    
  const { token } = useContext(AuthContext);

  //Delete Function
const DeletePost= async(postId) =>{
  const res = await fetch(`http://ferasjobeir.com/api/posts/${postId}`,
  {
    method: "DELETE",
    headers:{
      "Content-Type":"aplication/json",
       Authorization: `Bearer ${token}`,
    }
  });
  const json = await res.json();
  if(json.success){
    window.alert(json.messages)
    setCounter(counter+1)
    console.log(`counter:${counter}`)
  }
};
  return (
    <>
      {posts?.map((post) => (
        <div key={post?.id} className="posts-part">
          <div className="post">
            <h6 className="content">{post?.content}</h6>
            <button type="button" className=" btn btn-danger btn-sm" 
              onClick={()=>DeletePost(post.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
