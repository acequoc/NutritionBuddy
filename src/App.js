import './App.css'; // add script like in the previous html file
import Auth from './Login/auth';

//Presenter
import Save from './Presenter/save.js';
import Stored from './Presenter/storedPage.js';
import Search from './Presenter/search.js';
import Details from './Presenter/details';
import Graph from './View/graph';

import Homepage from './View/homepage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import useModelProp from './Presenter/useModelProp';

// Firebase
import firebase from "firebase";

const App= ({model}) => {

  return <Router>
    <div >
        <div className = "flexContainer"> 
          <nav>
          {!useModelProp(model, "userID") ? 
          <p></p>
          :
          <ul className = "nav">
            <li>
            <Link to="/">
            <img id="title-icon" alt="favicon" src={process.env.PUBLIC_URL + "/images/icons8-omlette-64.png"} width="30px"></img>
              </Link>
            </li>
            {<li className="nav-title" ><Link to="/search" onClick={()=>{model.clearList("clear");}}>New Recipe</Link></li>}
            <li className="nav-title"><Link to="/stored">My Recipes</Link></li>
            <li className="nav-title" ><Link to="/" onClick={
              ()=> {
                firebase.auth().signOut(); 
                window.localStorage.clear();
                model.setUserID(undefined);
                model.emptyRecipeList();
                model.clearList("clear");
              }
            }>Log out</Link></li>
          </ul>}
          </nav>
            {!useModelProp(model, "userID") ?
            <Switch>
              <Route path="/login">
                <Auth model={model}/>
              </Route>
              <Route path="/"> 
                <Homepage />
              </Route> 
            </Switch>
            : 
            <Switch>
              <Route path="/graph"> 
                <Graph model ={model} />
              </Route>
              <Route path="/save">
                <Save model={model}/>
              </Route>
              <Route path="/stored">
                <Stored model={model} />
              </Route>
              <Route path="/details">
                <Details model={model}/>
              </Route>
              <Route path="/search">
              <Search model = {model}/>
              </Route>
              <Route path="/">
              <Stored model={model} />
              </Route>
            </Switch>}       
          </div>
        </div>
  </Router>
}
export default App;
