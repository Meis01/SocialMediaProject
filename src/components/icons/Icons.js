import './Icons.css';
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Icons = () => {
    const links = [
        {
            target:'/',
            text:'Home',
           icon: <HomeIcon/>
            
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
       
            <div className="icon-box">
                {links.map((link, i)=>{
                        /* if(!token) return */
                        return(
                            <NavLink key={i} to={link.target} className={({isActive}) =>{
                                return (isActive) ? "active-link" : 'link'
                            }}>
                                
                                    <div className="icon-text">
                                        <div className="icon-item">{link.icon}</div> 
                                       
                                    </div>
                                </NavLink> 
                        )
                       })}  
                  </div>
                 
        </>

    )
}

export default Icons;