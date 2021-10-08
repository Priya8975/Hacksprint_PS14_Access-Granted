import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <Link to="/login">Login</Link> 
            <Link to="/cart">Cart</Link>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/resetPassword">Reset Password</Link>
            <Link to="/signup">Signup</Link>
        </header>
    )
}
