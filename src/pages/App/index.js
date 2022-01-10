import React, { useState, useEffect, Suspense, useContext } from 'react';
import css from  './style.module.css';
import Toolbar from '../../components/Toolbar';
import SideBar from '../../components/Sidebar';
import { Switch, Route } from 'react-router-dom';
import ShippingPage from '../ShippingPage';
import LoginPage from '../LoginPage';
import Logout from '../../components/Logout';
import { Redirect } from 'react-router-dom';
import { BurgerStore } from '../../context/BurgerContext';
import { OrderStore } from '../../context/OrderContext';
import UserContext from '../../context/UserContext';

const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
})

const OrderPage = React.lazy(() => {
  return import("../OrderPage");
})

const SignupPage = React.lazy(() => {
  return import("../SignupPage");
})

const App = props => {

  const userCtx = useContext(UserContext);

  const [showSideBar, setShowSidebar] = useState(false);

  const toggleSideBar = () => {
    setShowSidebar(prevShow => !prevShow)
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    const expireDate = new Date(localStorage.getItem('expireDate'));
    const refreshToken = new Date(localStorage.getItem('refreshToken'));

    if(token) {
      if(expireDate > new Date().getTime()) {
        userCtx.loginUserSuccess(token, userID, expireDate, refreshToken);
        //serCtx.autoLogout(expireDate.getTime() - new Date().getTime());
        userCtx.autoTokenRefresh(expireDate.getTime() - new Date().getTime());
      } else {
        userCtx.logout();
      }
    }
  }, []);

    return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar}/>
      <SideBar showSideBar={showSideBar} toggleSideBar={toggleSideBar} closeConfirmModal={props.closeConfirmModal}/>
      <main className={css.Content}>
        <BurgerStore>
          <Suspense fallback={<div>Please wait a moment ...</div>}>
            {userCtx.state.userID ? (
                <Switch>
                  <Route path="/orders">
                    <OrderStore>
                      <OrderPage />
                    </OrderStore>
                  </Route>   
                  <Route path="/logout" component={Logout} />
                  <Route path="/ship" component={ShippingPage} />   
                  <Route path="/" component={BurgerPage} />
                </Switch>
            ) : (
              <Switch>
                <Route path="/login" component={LoginPage} />   
                <Route path="/signup" component={SignupPage} /> 
                <Redirect to="/login" />
              </Switch>
            )}
          </Suspense>
        </BurgerStore>
      </main>
    </div>
    )
}

// const mapDispatchToProps = dispatch => {
//   return {
//     autoLogin: (token, userID) => dispatch(actions.LoginUserSuccess(token, userID))
//   }
// }

export default App;
