import { createContext, useState } from "react";


export const AuthContext = createContext();

const UserManager = ({children}) => {

const [user, setUser] = useState(JSON.parse(localStorage.getItem('the_user') || "{}") );
const [token, setToken] = useState( localStorage.getItem('the_token') || "");

//Signin Function
const signin = (userData, userToken) => {
setUser(userData)
setToken(userToken)
localStorage.setItem('the_user',JSON.stringify(userData))
localStorage.setItem('the_token', userToken)
}
//End SignIn Function

//make user and token empty to logout
const signOut =() =>{
setUser({})
setToken('')
localStorage.removeItem('the_user')
localStorage.removeItem('the_token')

}
//End signOut Function

    return(
       <AuthContext.Provider value={{
        user,
        token,
        signin,
        signOut
       }}>

{children}
        </AuthContext.Provider>
    )
}

export default UserManager;