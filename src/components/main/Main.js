import Nav from "../../components/nav/Nav";
import Icons from "../../components/icons/Icons";
import './Main.css';

const Main = (props) => {
  return (
    <>
    <div className="parent">
        <div className="children-1">
          <div className="hide-nav" id="side-nav">
          <Nav />
          </div>
        
       
        </div>
      
        <div className="children-2">
          <div className="head">
          <h4>{props.title}</h4>
          <div className="hide-icons" id="hide-icons">
            <Icons/>
          </div>
          </div>
          
          {props.children}
        </div>
    </div>
    </>
  );
};
export default Main;
