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
import { closeChannel } from './features/channelSlice';

function App() {

  
  const sessionTheme = sessionStorage.getItem('theme');
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(sessionTheme==="true"?true:false)

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

        dispatch(closeChannel())
        setLoading(false)
      }
    )

    return unsubscribe;
  }, [dispatch])

  const changeTheme = () => {
    if(theme){
      sessionStorage.setItem('theme', false);
      setTheme(false)
    }
    else{
      sessionStorage.setItem('theme', true);
      setTheme(true)
    }
  }

  return (
    <BrowserRouter>
      <div id="slackClone" className={theme?"darktheme":"lighttheme"}>
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
              <Route path="/messages" exact>
                <Home changeTheme={changeTheme} />
              </Route>
              <Route path="/users" exact>
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
