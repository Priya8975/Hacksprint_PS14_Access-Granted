import { signOut } from "@firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";

export default function Header() {
  const { logout, user } = useAuth();
  return (
  <header>
    <h1><Link to="/"> Bikezilla</Link></h1>
    <nav>
      <Link to="/products">Products</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/cart">Cart</Link>
      {(user)?   <Link to="/profile">Profile</Link>:    <Link to="/login">Login</Link>}
      {(user)?<button className="standalone" onClick={logout}> Logout </button>: <Link to="/signup">Signup</Link>}
    </nav>
  </header>
  );
}
