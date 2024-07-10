import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Logo from "./Logo";
import Login from "./Login";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  //to bypass the flashing of SignUp component caused by auth state 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  //the routing problem in react is called the Single page routing problem. It is a major problem in the client side routing. The problem is the route that we provide inside the website persists on reload as well which causes a PAGE NOT FOUND error while hosting. So to tackle that, ask chatgpt with spa-github-page as a resource  solution. 

  // react always loads the "/"  route first then if you want to redirect to other component based on some conditions on the initial page load then you can use the navigate props in "/" route. Such that it would redirect you to the desired components path

  if(loading) return <h1>Loading...</h1>;
  return (
    <Router>
      <Logo isAuth={isAuth}/>
      <Routes>
        <Route exact path="/" element={isAuth?<Navigate to="/dashboard"/>:<SignUp setIsAuth={setIsAuth}/>}/>
        <Route  path="/login" element={isAuth?<Navigate to="/dashboard"/>:<Login setIsAuth={setIsAuth}/> }/>
        <Route  path="/dashboard" element={isAuth?<Dashboard/>:<Navigate to="/"/>}/>
        <Route path="*" element={<Navigate to="/" />} /> {/* Handle unknown routes */}
      </Routes>
    </Router>
  );
}
