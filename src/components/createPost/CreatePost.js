import { json } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useRef, useContext } from "react";
import "./CreatePost.css";

const CreatePost = () => {
  const textareaRef = useRef();
  const { post, setPost, addPostWithoutRefresh } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const createPost = async () => {
    const res = await fetch("http://ferasjobeir.com/api/posts", {
      method: "POST",
      body: JSON.stringify({ content: textareaRef.current.value }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json)
    if (json.success) {
      console.log(json.data)
      addPostWithoutRefresh(json?.data);
      textareaRef.current.value = "";
    }
  };
  return (
    <>
      <div className="new">
        <img
          className="imageStyle"
          src="https://www.gravatar.com/avatar/006a8679155473958833a56b803eaf7d?s=200" width={40}
          alt=""
        />
        <div className="textarea">
          <textarea 
            ref={textareaRef}
            type="text"
            placeholder="What is happening?"
          ></textarea>
          <button
            className="btn btn-primary"
            type="button"
            onClick={createPost}
          >
            Create Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
