
import './Home.css';

import Main from '../../components/main/Main';
import HomePosts from '../../components/homePosts/HomePosts';


const Home = () =>{

    return(
      
       <Main title='Home'>
      <div>
        <HomePosts/>
      </div>
       </Main>
    )
}

export default Home;