import React, { Fragment } from 'react';
import {useHistory} from "react-router-dom";

const SaveView = ({nameMol, saveName, ingListName}) =>
{
    const [name, setName]= React.useState(ingListName);
    const [isSaved, setIsSaved] = React.useState(false);
    const history = useHistory();

    function onEnter(name) {
        if (name !== "") {
            nameMol(name);
            setIsSaved(true);
            saveName(name);    
        } else {
            alert("Empty name!");
        }
    }

    return <div id="save" className="save" >
            <div>
                {/* <p>Current Recipe Name is: {ingListName}</p> */}
                <label htmlFor="reName">Save Recipe as </label><br></br>
                <input type="text" 
                autoFocus 
                placeholder="Lasagna" value={name} 
                id="reName" 
                onChange={(event) => setName(event.target.value)}
                onKeyPress={(event)=> event.key === "Enter" ? onEnter(name) : null}/>
                <button className="graph-button" 
                onClick={
                    ()=> {
                        if (name !== "") {
                            nameMol(name);
                            setIsSaved(true);
                            saveName(name);    
                        } else {
                            alert("Empty name!");
                        }
                    }
                }>Save</button>
                {isSaved ? <button className="graph-button" onClick={()=> history.push("/stored")}>My recipes</button> : <Fragment></Fragment>}
            </div>
    </div>
}
export default SaveView;