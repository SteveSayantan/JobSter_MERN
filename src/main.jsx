import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'      // This is coming from a separately installed package 'normalize.css' for css reset . It must be imported before index.css as shown. 
import './index.css'
import {Provider} from 'react-redux'
import { store } from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
