import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { legacy_createStore as createStore} from 'redux'

import { rootReducer } from './Store/reducers/root.js'
import App from './App.jsx'

import './index.scss'

const store = createStore(rootReducer)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
