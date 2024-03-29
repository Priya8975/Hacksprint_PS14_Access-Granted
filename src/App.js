import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import ResetPassword from "./Components/ResetPassword";
import Signup from "./Components/Signup";
import Wishlist from "./Components/Wishlist";
import PrivateRoute from "./Utils/PrivateRoute";
import Products from "./Components/Products";
import Footer from "./Components/Footer";
import { AuthProvider } from "./Utils/AuthContext";
import Product from "./Components/Product";
import { DataProvider } from "./Utils/DataContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Header />
          <Switch>
            <PrivateRoute path="/wishlist" component={Wishlist} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/products" component={Products} />
            <Route path="/product/:id" component={Product} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
