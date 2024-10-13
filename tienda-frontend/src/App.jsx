import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cartpage';
import Orders from './pages/Order';
import Login from './pages/login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfilePage';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/orders" component={Orders} />
            <PrivateRoute path="/user/profile" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
