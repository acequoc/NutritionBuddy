/* eslint-disable default-case */
import firebase from "firebase";
import "firebase/auth";
import React from "react";
import Login from "./login.js";
import Stored from "../Presenter/storedPage.js";

// const { useState, useEffect } = require("react");
function Auth({model}) {
    const [user, setUser] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [hasAccount, setHasAccount] = React.useState('false');
    
    const clearInputs = ()=> {
        setEmail('');
        setPassword('');
    }
    
    const clearErrors = ()=> {
        setEmailError('');
        setPasswordError('');
    }
    
    const handleLogin = () => {
        clearErrors();
        firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .catch((err) => {
                switch (err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled": 
                    case "auth/user-not-found": 
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };
    
    const handleSignup = () => {                
        clearErrors();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .catch((err) => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email": 
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    }
    
    // const handleLogout = () => {
    //     firebase.auth().signOut();
    // };
    
    function authListener() {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    clearInputs();
                    setUser(user);
                    // console.log("authListener running....");
                    model.setUserID(user.uid);
                }
                else {
                    setUser("");
                }
            });
    }
    
    React.useEffect (() => {
        authListener();
    }, []);
    
    
    return (
        <div className="auth">
            {user ? (
                <>
                    {/* <Logout handleLogout={handleLogout}/>
                    <Search model={model}/> */}
                    <Stored model={model}/>
                </>
            ):(
                <Login
                    email = {email}
                    setEmail = {setEmail}
                    password = {password}
                    setPassword = {setPassword}
                    handleLogin = {handleLogin}
                    handleSignup = {handleSignup}
                    hasAccount = {hasAccount}
                    setHasAccount = {setHasAccount}
                    emailError = {emailError}
                    passwordError = {passwordError}
                />
            )}
        </div>
    );
};

export default Auth;