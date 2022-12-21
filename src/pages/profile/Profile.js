import Main from "../../components/main/Main";
import "./Profile.css";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Posts from '../../components/posts/Posts';
import { json } from "react-router-dom";

const Profile = () => {
    const token = useContext(AuthContext);
    const {user, setUser} = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const [counter, setCounter] = useState(0);
    const [image, setImage] = useState();
    const [userData, setUserData] = useState({
        
            name: user.name,
            email: user.email,
            password: "",
            new_password: "",
            new_password_confirmation: "",
           // avatar: "https://www.gravatar.com/avatar/9729153ddfd681496bc6c0ca73cff1f6?s=200"

        }
    );
    const [userProfile, setUserProfile] = useState({
    name:"",
    email:"",
  });

  function handleChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    user.avatar = image;
    
  }

  const handleOnChange = (e) => {
    userData[e.target.name] = e.target.value;
    
  // userData.avatar = URL.createObjectURL(e.target.files[0]);
    // setImage(URL.createObjectURL(e.target.files[0]));
 
    const updatedData = {...userData}
    updatedData[e.target.name] = e.target.value;
    setUserData(updatedData)
    setUser(updatedData)
  };

  const updateUser = async (e) => {
    const res = await fetch(`http://ferasjobeir.com/api/users/me`, {
        method: 'POST',
        headers: {
            "Accpet": "Application/json",
            Authorization: `Bearer ${token.token}`,
        },
        body: new FormData(e.target),
    });
    const json = await res.json();
   
    if (json.success){
        console.log(json)
        window.alert(json.messages)
       setUser(json.data)
       console.log(user)
        
    }
    else{
        window.alert(json.messages)
    }
  }

  const handleSubmit = async (event) => {
   
    event.preventDefault();
   // console.log(userData.email)
    await updateUser(event);
    console.log(userData)
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
    console.log(userData.name)
    console.log(userData.email)
    console.log(userData.password)
    console.log(token)
    
   // console.log(json.data.content)
  //  window.alert(json.content)
    setUserPosts(json.data.posts)
   // console.log(json.data.posts)
    userPosts.map((post,i)=>{
     console.log(`user Posts:${post.content} `)
    })
}
  }
  useEffect(() => {
    getProfileData();
   
  }, [counter]);
 
  return (
   
      <Main title="Profile">
        <div className="cotainer-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="profile-data">
                        <form onSubmit={handleSubmit}>
                       <div className="col-12 p-3 mb-4 bottom-border">
                        {/* blue area info */}
                          <div className="alert alert-info">My Information</div>
                          {/* start profile fields */}
                          {/* Start avatar */}
                          <div className=" mb-3 person-avatar">
                            <label htmlFor="avatar" className="mx-auto my-2 d-block " style={{width:150}}>
                                <img src={user?.avatar} className="d-block mx-auto rounded-circle w-100" width={150}/>
                                    
                             </label>
                             <input name="avatar" type="file" id="avatar" 
                                className="position-absolute" onChange={handleChange} />
                               
                                {/* <a target="_blank" title="instagram/web__addict" 
                                href="https://www.instagram.com/web__addict/"> 
                                    <i className="fab fa-instagram"></i></a> */}
                            {/* End Avatar */}
                            <div className="mb-3">
                                <label htmlFor="name" className="mb-2">
                                    <small>Name <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange}  defaultValue={userData?.name}  name="name" type="text" id="name" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="mb-2">
                                    <small>Email Address <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange}  defaultValue={userData?.email}  name="email" type="email" id="email" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="mb-2">
                                    <small>Password <span className="text-danger">*</span>
                                    </small>
                                </label>
                                <input onChange={handleOnChange} defaultValue={user.password}  name='password' type="password" id="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="new_password" className="mb-2">
                                    <small>New Password </small>
                                </label>
                                <input onChange={handleOnChange} name="new_password" type="password"  className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="new_password" className="mb-2">
                                    <small>New Password Confirmation</small>
                                </label>
                                <input onChange={handleOnChange} name="new_password_confirmation" type="password" id="password_confirmation" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <button type="submit"  className="btn btn-primary">Update Profile</button>
                            </div>
                          </div>
<input type="hidden" name="_method" value="put"/>
                          {/* End profile fields */}
                       </div>
                       </form>
                       <div className="user-posts">  
                       <div className="col-12 p-3 mb-4 ">
                        {/* blue area info */}
                          <div className="alert alert-info">My Posts</div>
                                <Posts
                                    posts={userPosts}
                                    counter = {counter}
                                    setCounter = {setCounter}
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
