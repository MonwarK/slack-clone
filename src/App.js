import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"
import { login, logout, selectUser } from "./features/userSlice"
import { auth } from './firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import Home from './screens/Home/Home';
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword"
import Loading from "./screens/Loading/Loading"
import Invite from "./screens/AcceptInvite/Loading"

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(false)

  useEffect(() => {

    setLoading(true)

    const unsubscribe = auth.onAuthStateChanged(
      userAuth => {
        if (userAuth){
          dispatch(login({
            uid: userAuth.uid,
            name: userAuth.displayName,
            email: userAuth.email,
            pfp: userAuth.photoURL
          }))
        }
        else{
          dispatch(logout())
        }

        setLoading(false)
      }
    )

    return unsubscribe;
  }, [dispatch])

  const changeTheme = () => {
    const page = document.getElementById("slackClone");
    if(theme){
      page.classList.remove("darktheme")
      page.classList.add("lighttheme")
      setTheme(false)
    }
    else{
      page.classList.remove("lighttheme")
      page.classList.add("darktheme")
      setTheme(true)
    }
  }

  return (
    <BrowserRouter>
      <div id="slackClone" className="lighttheme">
        {
          loading?
            <Loading />
          :
          !user
          ?
          <div>
            <a href="/">
              <img src="images/slack-logo.svg" alt="Slack Logo" className="logo" />
            </a>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/recover" exact component={ForgotPassword} />
              <Route path="/invite/:groupCode" component={Invite}/>
            </Switch>
          </div>
          :
          <div>
            <Switch>
              <Route path="/" exact>
                <Home changeTheme={changeTheme} />
              </Route>
              <Route path="/invite/:groupCode" component={Invite}/>
            </Switch>
          </div>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
