import React, {useContext, useEffect, useState} from "react";
import {auth, db} from './firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged} from "firebase/auth"

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [user, setUser] = useState();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);    
    }
    function logout(){
        return signOut(auth);
    }
    function resetPassword(email){
        return sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        return user.updateEmail(email);
    }

    
    function updatePassword(password){
        return user.updatePassword(password);
    }

    useEffect(()=>{
        return onAuthStateChanged(auth, (user)=>{
            setUser(user);
            setLoading(false);
        });
    },[]);


    const value = {
        user,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
