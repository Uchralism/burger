import React, {useState, useEffect} from 'react';
import css from  './style.module.css';

import Toolbar from '../../components/Toolbar';
import BurgerPage from '../BurgerPage';
import SideBar from '../../components/Sidebar';
import OrderPage from '../OrderPage';
import { Switch, Route } from 'react-router-dom';
import ShippingPage from '../ShippingPage';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import { connect } from 'react-redux';
import Logout from '../../components/Logout';
import { Redirect } from 'react-router-dom';
import * as actions from '../../redux/actions/LoginActions';

const App = props => {
  const [showSideBar, setShowSidebar] = useState(false);

  const toggleSideBar = () => {
    setShowSidebar(prevShow => !prevShow)
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    const expireDate = new Date(localStorage.getItem('expireDate'));

    if(token) {
      if(expireDate > new Date().getTime()) {
        props.autoLogin(token, userID);
        props.AutoLogout(expireDate.getTime() - new Date().getTime());
      } else {
        props.Logout();
      }
    }
  }, []);

    return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar}/>
      <SideBar showSideBar={showSideBar} toggleSideBar={toggleSideBar} closeConfirmModal={props.closeConfirmModal}/>
      <main className={css.Content}>
        {props.userID ? (
            <Switch>
              <Route path="/orders" component={OrderPage} /> 
              <Route path="/ship" component={ShippingPage} />  
              <Route path="/logout" component={Logout} />   
              <Route path="/" component={BurgerPage} /> 
            </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={LoginPage} />   
            <Route path="/signup" component={SignupPage} /> 
            <Redirect to="/login" />
          </Switch>
        )}
      </main>
    </div>
    )
}

const mapStateToProps = state => {
  return {
    userID: state.SignupReducer.userID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userID) => dispatch(actions.LoginUserSuccess(token, userID)),
    Logout: () => dispatch(actions.LogOut()),
    AutoLogout: (ms) => dispatch(actions.autoLogout(ms))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
