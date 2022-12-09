import React, { Suspense } from 'react';
import Loading from './components/loading/Loading';
import './App.css';
import { Route, Routes } from 'react-router-dom';
const SignIn = React.lazy(() => import  ('./pages/signin/SignIn')) ;
const SignUp = React.lazy(() => import( './pages/signup/SignUp'));
const SignOut = React.lazy(() => import( './pages/signout/SignOut'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const Nav = React.lazy(() => import( "./components/nav/Nav"))


function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Suspense fallback={<Loading/>} ><Home/></Suspense>} />
    <Route path='/signin' element={<Suspense fallback={<Loading/>}><SignIn/></Suspense>} />
    <Route path='/signup' element={<Suspense fallback={<Loading/>} ><SignUp/></Suspense>} />
    <Route path='/signout' element={<Suspense fallback={<Loading/>} ><SignOut /></Suspense>} />
    <Route path='/profile' element={<Suspense fallback={<Loading/>} ><Profile /></Suspense>} />
    
    <Route path="*" element={<>NOT FOUND</>} />
   </Routes>
   </>
  );
}

export default App;
