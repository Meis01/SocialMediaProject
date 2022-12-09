import Main from "../../components/main/Main";
import "./Profile.css";
import React, { useState } from "react";

const Profile = () => {
  const [image, setImage] = useState();
  function handleChange(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <>
      <Main title="Profile">
        <input type="file" onChange={handleChange} />
        <img src={image} />
      </Main>
    </>
  );
};

export default Profile;
