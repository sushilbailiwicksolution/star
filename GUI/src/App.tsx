import React from 'react';
import './App.scss';
import '../src/Assets/scss/styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import UserLogin from './Components/login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Components/dashboard';
import UserSignUp from './Components/signup';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './Components/forgotpassword';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import Logout from './Components/Logout';
import Users from './Components/Users/index';
import CreateUsers from './Components/Users/CreateUsers';
import Admin from './Components/Admin/index';
import CreateAdmin from './Components/Admin/CreateAdmin';
import Customer from './Components/Customer';
import CreateCustomer from './Components/Customer/CreateCustomer';
import Assets from './Components/Assets';
import EditAssets from './Components/Assets/editAssets';
import Reports from './Components/Reports/index';
import Analyze from './Components/Analyze/index';
import PrivateRoute1 from './Routes/PrivateRoute1';
import Plan from './Components/Plan';
import View from './Components/View';
import KMPMAP from './Components/dashboard/kmlMap';
import OpenLayer from './Components/dashboard/openlay';
import Notification from './Components/Plan/notification';
import Location from './Components/Plan/Location';
import LandmarkList from './Components/Plan/landmark-list';
import Create_layer from './Components/Plan/create_layer';
import Editlayer from './Components/Plan/edit_layer';
import CreateNotification from './Components/Plan/create-notification';
import ViewNotification from './Components/Plan/view-notification';
import NotificationOutboundSetup from './Components/Plan/notification-outboundSetup';
import NotificationEventSecurity from './Components/Plan/notification-event-security';
import Geofences from './Components/Plan/geofences';
import CreateGeofences from './Components/Plan/create-geoFences';
import ViewGeofences from './Components/Plan/view-geoFences';

function App() {
  return (
    <div className='App'>
      <ToastContainer autoClose={5000} />
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path='/' component={UserLogin}></PublicRoute>
          <PublicRoute
            exact
            path='/register'
            component={UserSignUp}
          ></PublicRoute>
          <PrivateRoute
            exact
            path='/dashboard'
            component={Dashboard}
          ></PrivateRoute>
          <PublicRoute
            exact
            path='/forgot-password'
            component={ForgotPassword}
          ></PublicRoute>
          <Route exact path='/logout' component={Logout}></Route>
          <PrivateRoute exact path='/users' component={Users} />
          <PrivateRoute exact path='/create-user' component={CreateUsers} />
          <PrivateRoute exact path='/admin' component={Admin} />
          <PrivateRoute exact path='/create-admin' component={CreateAdmin} />
          <PrivateRoute exact path='/customers' component={Customer} />
          <PrivateRoute
            exact
            path='/create-customer'
            component={CreateCustomer}
          />
          <PrivateRoute exact path='/assets' component={Assets} />
          <PrivateRoute exact path='/edit-assets' component={EditAssets} />
          <PrivateRoute exact path='/reports' component={Reports} />
          <PrivateRoute exact path='/analyze' component={Analyze} />
          <PrivateRoute exact path='/plan' component={Plan} />
          <PrivateRoute exact path='/view' component={View} />
          <PrivateRoute exact path='/map-layer' component={KMPMAP} />
          <PrivateRoute exact path='/overlay' component={OpenLayer} />
          <PrivateRoute exact path='/notification' component={Notification} />
          <PrivateRoute exact path='/landmark' component={Location} />
          <PrivateRoute exact path='/landmark-list' component={LandmarkList} />
          <PrivateRoute exact path='/create-layer' component={Create_layer} />
          <PrivateRoute exact path='/edit-layer' component={Editlayer} />
          <PrivateRoute
            exact
            path='/create-notification'
            component={CreateNotification}
          />
          <PrivateRoute
            exact
            path='/view-notification'
            component={ViewNotification}
          />
          <PrivateRoute
            exact
            path='/notification-outboundSetup'
            component={NotificationOutboundSetup}
          />
          <PrivateRoute
            exact
            path='/notification-event-security'
            component={NotificationEventSecurity}
          />
          <PrivateRoute exact path='/geofences' component={Geofences} />
          <PrivateRoute
            exact
            path='/create-geoFences'
            component={CreateGeofences}
          />
          <PrivateRoute
            exact
            path='/view-geoFences'
            component={ViewGeofences}
          />

          <PublicRoute path='*' exact={true} component={UserLogin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
