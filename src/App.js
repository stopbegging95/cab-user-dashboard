
import React, { useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Routes true
import Home from './components/Layout/Home/Home'
import Wallet from './components/Layout/Wallet/Wallet'
import Notification from './components/Layout/Notification/Notification'
import Support from "./components/Layout/Support/Support"
import Settings from "./components/Layout/Settings/Settings"
import EditProfile from "./components/Layout/Settings/EditProfile/EditProfile"
import AcctDetail from "./components/Layout/Settings/AcctDetail/AcctDetail"
import Security from "./components/Layout/Settings/Security/Security"
import NotificationSettings from "./components/Layout/Settings/NotificationSettings/NotificationSettings"
import About from "./components/Layout/Settings/About/About"
import ReqDelivery from "./components/Layout/Home/ReqDelivery/ReqDelivery"
import Chats from "./components/Layout/Chats/Chats"

//Routes false
import IndexHome from "./components/IndexHome/IndexHome"
import Login from './components/Login/Login'
import Verification from "./components/Login/Verification/Verification"
import PageNotFound from "./components/Utilities/PageNotFound/PageNotFound"
import ResetPwd from "./components/Login/ResetPwd/ResetPwd"

import './App.css'

library.add(fab, fas, far)

function App() {
  // TO ACCESS THE NORMAL UI CHANGE THE STATE TO TRUE
  const navigate = useNavigate()

  const [auth, setAuth] = useState(false)
  const [signUp, setSignUp] = useState(false)

  const [showSideBar, setShowSideBar] = useState(true)

  const [vrfyEmail, setVrfyEmail] = useState('')
  const [resetPage, setResetPage] = useState(false)

  const goToVerify = () => {
    setSignUp(true)
    navigate('verification')
  }

  const signInUser = () => {
    if (resetPage) {
      navigate('resetPassword')
      setResetPage(false)
    } else {
      setAuth(!auth)
      navigate('/')
    }
  }
  const signOutUser = () => {
    setAuth(!auth)
    navigate('/')
  }

  const showSideBarFunc = () => {
    setShowSideBar(!showSideBar)
  }

  const loggedInRoutes = (
    <Routes>
      <Route path="/" element={<Home
        signOutUser={signOutUser}
        showSideBar={showSideBarFunc}
        showSideBarState={showSideBar}
      />} />
      <Route path="reqDelivery" element={<ReqDelivery
        signOutUser={signOutUser}
        showSideBar={showSideBarFunc}
        showSideBarState={showSideBar}
      />} />
      <Route path="wallet" element={<Wallet
        signOutUser={signOutUser}
        showSideBar={showSideBarFunc}
        showSideBarState={showSideBar}
      />} />
      <Route path="chats" element={<Chats
        signOutUser={signOutUser}
        showSideBar={showSideBarFunc}
        showSideBarState={showSideBar}
      />} />
      <Route path="notification" element={<Notification
        signOutUser={signOutUser}
        showSideBar={showSideBarFunc}
        showSideBarState={showSideBar}
      />} />
      <Route path="support" element={<Support
        signOutUser={signOutUser}
        showSideBar={showSideBarFunc}
        showSideBarState={showSideBar}
      />} />
      <Route path="settings" element={<Settings
        signOutUser={signOutUser}
        showSideBar={showSideBarFunc}
        showSideBarState={showSideBar}
      />} >
        <Route path="editProfile" element={<EditProfile />} />
        <Route path="accDetail" element={<AcctDetail />} />
        <Route path="security" element={<Security />} />
        <Route path="notificationSettings" element={<NotificationSettings />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )

  const loggedOutRoutes = (
    <Routes>
      <Route path="/" element={<IndexHome />} />
      <Route path="/login" index element={<Login
        getVerify={(param) => {
          goToVerify()
          setResetPage(param)
        }}
        onVerify={signInUser}
        setEmail={setVrfyEmail} />}
      />
      {signUp && <Route path="verification" element={<Verification email={vrfyEmail} onVerify={signInUser} />} />}
      {signUp && <Route path="resetPassword" element={<ResetPwd onVerify={signInUser} />} />}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
  console.log(resetPage);

  return (
    <div className="mx-auto App">
      {auth ? loggedInRoutes : loggedOutRoutes}
    </div>
  )
}

export default App;
