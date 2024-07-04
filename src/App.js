import { Routes, Route } from 'react-router-dom'

import './App.css'
import Box from './components/Box'
import Main from './layouts/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { MyProfile, OtherProfile } from './pages/Profile'
import MyPost from './pages/Post/MyPost'
import TagPost from './pages/Post/TagPost'
import SavePost from './pages/Post/SavePost'
import Following from './pages/Profile/ProfileSidebar/Following'
import Follower from './pages/Profile/ProfileSidebar/Follower'
import FollowRequest from './pages/Profile/ProfileSidebar/FollowRequest'
import ProfileView from './pages/Profile/ProfileSidebar/ProfileView'
import PostCreate from './pages/Post/PostCreate'
import ProtectedRoute from './routes/ProtectedRoute'
import OtherUserPost from './pages/Profile/OtherUserPost'
import OtherUserFollowing from './pages/Profile/OtherUserFollowing'
import OtherUserFollower from './pages/Profile/OtherUserFollower'
// import PostMoment from './pages/Post/PostMoment'

function App() {
  var LoginPage = Box(Login, true)
  var HomePage = Main(Home)
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='forgot-password' element={<ForgotPassword />}></Route>
        <Route path='home' element={<ProtectedRoute><HomePage /></ProtectedRoute>}></Route>
        <Route path='profile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>}>
          <Route path='post' element={<ProtectedRoute><MyPost /></ProtectedRoute>}></Route>
          <Route path='tag-post' element={<ProtectedRoute><TagPost /></ProtectedRoute>}></Route>
          <Route path='save-post' element={<ProtectedRoute><SavePost /></ProtectedRoute>}></Route>
          <Route path='following' element={<ProtectedRoute><Following /></ProtectedRoute>}></Route>
          <Route path='followers' element={<ProtectedRoute><Follower /></ProtectedRoute>}></Route>
          <Route path='profile-views' element={<ProtectedRoute><ProfileView /></ProtectedRoute>}></Route>
          <Route path='follow-req' element={<ProtectedRoute><FollowRequest /></ProtectedRoute>}></Route>
        </Route>
        <Route path='other-profile' element={<ProtectedRoute><OtherProfile /></ProtectedRoute>}>
          <Route path='post/:id' element={<ProtectedRoute><OtherUserPost /></ProtectedRoute>}></Route>
          <Route path='following/:id' element={<ProtectedRoute><OtherUserFollowing /></ProtectedRoute>}></Route>
          <Route path='followers/:id' element={<ProtectedRoute><OtherUserFollower /></ProtectedRoute>}></Route>
        </Route>
        <Route path='post' element={<PostCreate />}></Route>
        {/* <Route path='post-moment' element={<PostMoment />}></Route> */}
      </Routes>
    </>
  )
}

export default App;
