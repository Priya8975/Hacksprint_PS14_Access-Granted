import { signOut } from "@firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";
import { useData } from "../Utils/DataContext";

export default function Header() {
  const { logout, user } = useAuth();
  const {data} = useData();
  return (
  <header>
    <h1><Link to="/"> Bikezilla</Link></h1>
    <nav>
      <Link to="/products">Products</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/cart">Cart {(user && data.cart && data.cart.quantity)?`(${data.cart.quantity})`:"(0)"} </Link>
      {(user)?   <Link to="/profile">Profile</Link>:    <Link to="/login">Login</Link>}
      {(user)?<button className="standalone" onClick={logout}> Logout </button>: <Link to="/signup">Signup</Link>}
    </nav>
  </header>
  );
}
