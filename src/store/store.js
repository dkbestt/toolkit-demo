import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Custom Imports
import counterReducer from './reducers/stepSlice'
import userReducer from './reducers/userSlice'
import tokenReducer from './reducers/tokenSlice'
import loginReducer from './reducers/loginSlice'
import forgotPasswordReducer from './reducers/forgotPasswordSlice'
import postReducer from './reducers/postSlice'
import profileReducer from './reducers/profileSlice'
import commentReducer from './reducers/commentSlice'
import storyReducer from './reducers/storySlice'
import otherUserProfileReducer from './reducers/otherUserProfileSlice'
import followerFollowingReducer from './reducers/followerFollowingSlice'

const persistConfig = {
    key: 'root',
    version: "1.1.0",
    storage,
}

const reducer = combineReducers({
    step: counterReducer,
    login: loginReducer,
    register: userReducer,
    forgot_password: forgotPasswordReducer,
    token: tokenReducer,
    profile: profileReducer,
    otherUser: otherUserProfileReducer,
    post: postReducer,
    followerFollowing: followerFollowingReducer,
    comment: commentReducer,
    story: storyReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;


// import { configureStore } from '@reduxjs/toolkit'

// Custom Imports
// import counterReducer from './reducers/stepSlice'
// import userReducer from './reducers/userSlice'
// import tokenReducer from './reducers/tokenSlice'
// import loginReducer from './reducers/loginSlice'
// import forgotPasswordReducer from './reducers/forgotPasswordSlice'
// import postReducer from './reducers/postSlice'
// import profileReducer from './reducers/profileSlice'
// import commentReducer from './reducers/commentSlice'
// import storyReducer from './reducers/storySlice'

// export default configureStore({
//     reducer: {
//         step: counterReducer,
//         login: loginReducer,
//         register: userReducer,
//         forgot_password: forgotPasswordReducer,
//         token: tokenReducer,
//         profile: profileReducer,
//         post: postReducer,
//         comment: commentReducer,
//         story: storyReducer
//     },
// })