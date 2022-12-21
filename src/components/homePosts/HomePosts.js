import { AuthContext } from "../../contexts/AuthContext";
import CreatePost from "../createPost/CreatePost";
import { useContext, useEffect,useRef,useState } from "react";
import HomePost from "../homePost/HomePost";
const HomePosts = () =>{

const {posts, setPosts, token}  = useContext(AuthContext);
const [load, setLoad] = useState(false);
const [page, setPage] = useState(1);
const [lastPage, setLastPage] = useState(1);
const [currentPage, setCurrentPage] = useState(1);
const endRef = useRef();
const allPosts = async () => {
    setLoad(true);
  //  const ulrPage = `&page=${page}`;
 
const res = await fetch(`http://ferasjobeir.com/api/posts?page=${currentPage}`,{
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
const json = await res.json();
console.log(json)



if(json.success){
    console.log(`Number of all pages: ${json.data.last_page}`)
    setCurrentPage((page)=>{ return page=page+1})
//setLastPage(json.last_page)
   setLastPage(json.data.last_page)
   console.log(`lastPage${lastPage}`);
    setPosts((oldPosts)=>{
        return [...oldPosts,...json.data.data]
    })
   // setPosts([...json.data.data])
    setLoad(false)
    console.log(json.data.current_page)
    console.log(json.data.current_page+1)
   
}
else{window.alert("There is no post!")
console.log(json.data)}
}

/* useEffect(() => {
    allPosts()
    return () => {
        console.log(`cleanup `)
    };
}, [page]); */
//For scroll
/* useEffect(() => {
    const event = window.addEventListener('scroll', ()=>{
    if(!load && window.innerHeigth + window.scrollY >= document.body.scrollHeight )
        { console.log(`it worked`);
            setPage((oldPage) => {
            return oldPage + 1})
            console.log(page)
        }
    })
    return ()=> window.removeEventListener('scroll',event)
}, []); */
//End scroll
useEffect(() => {
    if(currentPage==1) allPosts();
    const handleScroll = event => {
      console.log('window.scrollY', window.scrollY);
      if(!load && (window.innerHeight + window.scrollY)>= document.body.scrollHeight)
      { console.log(`it worked`);
           console.log(currentPage,lastPage)
          /*  setCurrentPage((page)=>{ return page++}) */
          /* setPage((oldPage) => {
            if(oldPage<28)
            {return oldPage+=1;
               
            }
          else{console.log("The end of the posts")
          console.log(page)
              } */
              if(currentPage<=lastPage)
                 { //setCurrentPage(currentPage);
                    console.log(`Current Page:${currentPage}`)
                    allPosts()}
                else{window.alert("End of posts")
                endRef.current.value = "The End Of Posts"
                        }
      }    
      }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

    return(
        <>
        <CreatePost/>
        <div className="mb-4">
           <div className="post">
{
    posts?.map((post,i)=>(<HomePost key={i} data={post}  allPosts={posts} changePosts={setPosts}/>)
     // To do for every single post ::Post component that display post area at home page
      
    )
    
}
<input ref={endRef}  style={{border: "transparent"}}/>
           </div>

        </div>
        </>
    )
}

export default HomePosts;