import React from "react";
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
const Logout= ({model}) =>{
    const history = useHistory();
    //const list = useModelProp(model, "recipeList");
    return (

        <li><Link to="/">
            <button className="logout" onClick={()=> {
            firebase.auth().signOut(); 
            
            history.push("/login"); 
            model.setUserID(undefined)}}>Logout</button>
            </Link></li>
                
    )
}

export default Logout;