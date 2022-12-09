import Nav from "../../components/nav/Nav";
import './Main.css'
const Main = (props) => {
  return (
    <>
    <div className="parent">
        <div className="children-1">
        <Nav />
        </div>
      
        <div className="children-2">
          <h1>{props.title}</h1>
          {props.children}
        </div>
    </div>
    </>
  );
};
export default Main;
