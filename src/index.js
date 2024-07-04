import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import store from './store/store'
import reportWebVitals from './reportWebVitals'

// ----------------------------------------------------------------------------------------------
// With the Redux Persist library, developers can save the Redux store in persistent storage,
// for example, the local storage. Therefore, even after refreshing the browser,
// the site state will still be preserved.
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
let persistor = persistStore(store)
// ----------------------------------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// tol log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
