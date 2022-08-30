import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Post from "./pages/Post";
import { AuthContext } from "./context/authContext";
import CreatePost from "./components/Posts/CreatePost";
import SinglePost from "./components/Posts/ShowSinglePost";
import EditPost from "./components/Posts/EditPost";
import HomeSinglePost from "./components/Home/HomeSinglePost";
import Loader from "./components/Loader/Loader";
import HashLoader from 'react-spinners/HashLoader';

const App = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  
  return (
    <>
    {loading && 
      <Loader color={'#ffff'} LoaderName={HashLoader} />
    }

      {!loading && <Router>
        <Routes>
          <Route path="/">
            <Route path='' element={<Home />} />
            <Route path=':id' element={<HomeSinglePost />} />
          </Route>
          <Route path="posts">
            <Route path="" element={isLoggedIn ? <Post /> : <Navigate to='/login' />} />
            <Route path=":id" element={isLoggedIn ? <SinglePost /> : <Navigate to='/login' />} />
            <Route path=":id/edit" element={isLoggedIn ? <EditPost /> : <Navigate to='/login' />} />
          </Route>
          <Route path="login" element={!isLoggedIn ? <Login /> : <Navigate to='/posts' /> } />
          <Route path="signup" element={!isLoggedIn ? <Signup /> : <Navigate to='/posts' />} />
          <Route path="posts/create" element={isLoggedIn ? <CreatePost /> : <Navigate to='/login' />} />
          <Route path="*" element={ <Home />} />
        </Routes>
      </Router>}
    </>
  );
}

export default App;
