import { useContext } from "react";
import './Nav.css';
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ListIcon from '@mui/icons-material/List';
import ExploreIcon from '@mui/icons-material/Explore';

const Nav = () => {
 /*    const {signOut} = useContext(AuthContext)
const {token} = useContext(AuthContext); */
const links = [
    {
        target:'/',
        text:'Home',
       icon: <HomeIcon/>
        
    },
    {
        target:'/',
        text:'Messages',
        icon: <EmailIcon/>
        

    },
    {
        target:'/',
        text:'Bookmarks',
        icon: <BookmarksIcon/>
    },
    {
        target:'/',
        text:'Explore',
        icon: <ExploreIcon/>
    },
    {
        target:'/',
        text:'Lists',
        icon: <ListIcon/>
    },
    {
        target:'/profile',
        text:'Profile',
        icon: <PersonIcon/>
    },
    {
        target:'/signout',
        text:'SignOut',
        icon: <LockIcon/>
    }  
]

    return(
        <>
        <div className="nav-part">
            
              <img className='logo-img' src="logo.svg" alt="react-logo"/> 
            
            <div className="nav-items">
                
                    {links.map((link, i)=>{
                        /* if(!token) return */
                        return(
                            <NavLink key={i} to={link.target} className={({isActive}) =>{
                                return (isActive) ? "active-link" : 'link'
                            }}>
                                
                                    <div className="icon-text">
                                        <div className="icon">{link.icon}</div> 
                                        <div className="text">{link.text}</div>
                                    </div>
                                       
                                    

                                </NavLink>
                          
                            
                        )
                       })}       
              
            </div>

        </div>
        </>
    )
}
export default Nav;