import React from "react";

//Displays the add search bar used in graph
const AddForm=({onSearch}) => {
    const [text, setText]= React.useState("");
        return <div className = "add"> 
                    <input type ="text" 
                    placeholder="Add another ingredient" 
                    onChange={(event) => setText(event.target.value)}  
                    onKeyPress={(event)=> event.key=== "Enter"? onSearch(text):null}></input>
                    <button className="graph-button" onClick={e=> onSearch(text)}>search</button> 
                </div>
    }
    
//Displays the search result and search bar with quantity
const AddResultsView = ({h, searchResults, addMol, model}) => {
    const [text, setText]= React.useState("");
    function onEnter(searchResults, text) {
        addMol(searchResults, text);
    }
    return <div className = "add">
                <br></br>
                <span className= "headerColor" >How many grams of {searchResults.label}:  </span>
                <input type = "text" 
                placeholder = "100" 
                onChange={(event) => setText(event.target.value)}  
                onKeyPress={(event)=> event.key=== "Enter"? onEnter(searchResults, text) : null}></input>
                <button className="graph-button" type = "button" disabled = {model.alreadySearched(searchResults)} onClick= {()=> {addMol(searchResults, text);}} >add</button>

            </div>
    }
export {AddForm, AddResultsView};