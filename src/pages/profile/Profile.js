import Main from "../../components/main/Main";
import "./Profile.css";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Posts from '../../components/posts/Posts';

const Profile = () => {
    
    
    const token = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email:"",
        password:"",
       
    });
    const [userPosts, setUserPosts] = useState([]);
  const [image, setImage] = useState();
  const [userProfile, setUserProfile] = useState({
    name:"",
    email:"",
    
  });
  function handleChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  const handleOnChange = (e) => {
    userProfile[e.target.name] = e.target.value;
    const updatedData = {...userProfile}
    updatedData[e.target.name] = e.target.value;
    setUserProfile(updatedData)
  };
  const getProfileData = async() =>  {
   const res = await fetch("http://ferasjobeir.com/api/users/me",{
    method: 'GET',
    body: null,
    headers: {
        "content-type" : "application/json",
        Authorization: `Bearer ${token.token}`
    },
});
const json = await res.json();
if(json.success)
{
    
    window.alert(json.messages)
    setUserPosts(json.data.posts)
    console.log(json.data.posts)
}
  }
  useEffect(() => {
    getProfileData();
   
  }, []);
 
  return (
   
      <Main title="Profile">
        <div className="cotainer-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="profile-data">
                        <form>
                       <div className="col-12 p-3 mb-4 bottom-border">
                        {/* blue area info */}
                          <div className="alert alert-info">My Information</div>
                          {/* start profile fields */}
                          {/* Start avatar */}
                          <div className=" mb-3 person-avatar">
                            <label htmlFor="avatar" className="mx-auto my-2 d-block w-25">
                                <img src="https://www.gravatar.com/avatar/59029276955677351421b3ff6bf5ee4c?s=200" className="d-block mx-auto rounded-circle w-100"/>
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                            <path fill="#FFF" d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z">
                                </path>
                                </svg>
                                </div>
                             </label>
                             <input name="avatar" type="file" id="avatar" 
                                className="position-absolute" onChange={handleChange} />
                                <img src={image} />
                                <a target="_blank" title="instagram/web__addict" 
                                href="https://www.instagram.com/web__addict/"> 
                                    <i className="fab fa-instagram"></i></a>
                            {/* End Avatar */}
                            <div className="mb-3">
                                <label htmlFor="name" className="mb-2">
                                    <small>Name <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange} value={user.name} name="name" type="text" id="name" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="mb-2">
                                    <small>Email Address <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange} value={user.email} name="email" type="email" id="email" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="mb-2">
                                    <small>Password <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange} name="password" type="text" id="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password_confirmation" className="mb-2">
                                    <small>New Password Confirmation</small>
                                </label>
                                <input onChange={handleOnChange} name="new_password_confirmation" type="password" id="password_confirmation" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Update Profile</button>
                            </div>
                          </div>

                          {/* End profile fields */}
                       </div>
                       </form>
                       <div className="user-posts">  
                       <div className="col-12 p-3 mb-4 ">
                        {/* blue area info */}
                          <div className="alert alert-info">My Posts</div>
                                <Posts
                                    posts={userPosts}
                                   
                                />
                        </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
       
       
      </Main>
    
  );
};

export default Profile;
