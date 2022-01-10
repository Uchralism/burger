import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
//import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//import { Provider } from 'react-redux';
//import BurgerReducer from './redux/reducer/BurgerReducer';
//import OrderReducer from './redux/reducer/OrderReducer';
//import SignupReducer from './redux/reducer/SignupLoginReducer';
//import thunk from 'redux-thunk';
import { UserStore } from './context/UserContext';

// const loggerMiddleware = store => {
//   return next => {
//     return action => {
//       return next(action);
//     }
//   }
// }

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const reducers = combineReducers({
//   BurgerReducer,
//   OrderReducer,
//   SignupReducer
// })

// const middlewares = [loggerMiddleware, thunk];

// const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

ReactDOM.render(
  
    <React.StrictMode>
      {/* <Provider store={store}> */}
        <BrowserRouter>
          <UserStore>
            <App />
          </UserStore>
        </BrowserRouter>
      {/* </Provider> */}
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
