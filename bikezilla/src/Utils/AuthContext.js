import React, {useContext, useEffect, useState} from "react";
import {auth} from './firebase';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }
    
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);    
    }
    function logout(){
        return auth.signOut();
    }
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        return user.updateEmail(email);
    }

    
    function updatePassword(password){
        return user.updatePassword(password);
    }

    useEffect(()=>{
        return auth.onAuthStateChanged((user)=>{
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
