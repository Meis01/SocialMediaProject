import { createContext, useState } from "react";

export const AuthContext = createContext();

const UserManager = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("the_user") || "{}"));
  const [token, setToken] = useState(localStorage.getItem("the_token") || "");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  //Signin Function
  const signin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setLoggedIn(true);
    localStorage.setItem("the_user", JSON.stringify(userData));
    localStorage.setItem("the_token", userToken);
  };
  //End SignIn Function

  //make user and token empty to logout
  const signOut = () => {
    localStorage.removeItem("the_user");
    localStorage.removeItem("the_token");
    setLoggedIn(false);
    setUser({});
    setToken("");
  };
  //End signOut Function
  const addcommentWithoutRefresh = (newComment) => {
    setComments([...comments, newComment]);
  };
  //START func to add post without refresh
  const addPostWithoutRefresh = (newPost) => {
    setPosts([newPost,...posts]);
  };
  //END func to add post without refresh
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        signin,
        signOut,
        posts,
        setPosts,
        addPostWithoutRefresh,
        addcommentWithoutRefresh,
        comments,
        setComments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserManager;
