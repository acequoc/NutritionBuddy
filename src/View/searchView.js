import React from 'react';
import { useHistory } from "react-router-dom";

//Displays search results after first search and quantity search bar
const SearchResultsView = ({h, searchResults, setModel, notAdded}) => {
    const [text, setText]= React.useState("");
    const history = useHistory();

    function gotoGraph(result, quantity) {
         
        if (/^(\s*|\d+)$/.test(quantity)) {
            setModel(result, quantity); 
            history.push("/graph");    
        } else {
            alert("Enter a number!");
        }
        
    }

    return <div className="search-bg">
        <div className="search">
                <span className= "search-text">How many grams of {searchResults.label}? </span>
                <br></br>
                <input type="text" 
                placeholder="100" 
                autoFocus 
                onChange={(event) => setText(event.target.value)}   
                onKeyPress={(event)=> event.key === "Enter" ? gotoGraph(searchResults, text) : null}></input>
                <button 
                    type="button" 
                    onClick= {()=> {setModel(searchResults, text); history.push("/graph");}} 
                    >add</button>
            </div>
        </div>
}

//Displays the search bar 
const SearchFormReact=({onSearch}) => {
    const [text, setText]= React.useState("");
        return <div className="graph-bg">
            <div className="search">
                    <br></br>
                        {/* <img src="../icons8-omlette-64.png"></img> */}
                    {/* <h1>
                        <span className= "stored-title">Visualize the macronutrients of your favorite recipes</span>
                    </h1> */}
                    <h1>
                        <span className= "search-header">Start by searching for the first ingredient to add into your recipe</span>
                    </h1>
                    <input type="text" autoFocus placeholder="Search for apple" onChange={(event) => setText(event.target.value)}  onKeyPress={(event)=> event.key === "Enter" ? onSearch(text):null}></input>
                    <button onClick={e=> onSearch(text)}>Search</button>
                </div>
        </div>
}

export{
    SearchResultsView, 
    SearchFormReact
}
