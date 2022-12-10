import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import "./Posts.css";

const Posts = ({ posts }) => {
    
  const { token } = useContext(AuthContext);

  return (
    <>
      {posts?.map((post) => (
        <div key={post?.id} className="posts-part">
          <div className="post">
            <h6 className="content">{post?.content}</h6>
            <button type="button" className=" btn btn-danger btn-sm">
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
