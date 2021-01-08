import {useHistory} from "react-router-dom";
import StoredPageDougnut from "./storedPageDougnut";

const StoredView = ({reList, model, removeRecipe, clearL}) =>
{
    const history = useHistory();
    return  <div className="flexStored" >
            <br></br>
                <h1 className="title-box"> 
                    <span className= "stored-title"> My saved Recipes</span>
                    <br></br>
                    <span className= "stored-header">These are your recipes!</span>
                </h1>
                <br></br>
            <div className="recipesContainer">
                <div className="recipe" id="plusButton" onClick={()=>{clearL("clear"); history.push("/search");}}>
                  +  
                </div>
                {reList.map(recipe=>
                    <div className="recipe" key={recipe.name}>
                            <p id="recipe-name" 
                                onClick={() => {
                                    model.setCurrentIngredientList([...recipe.ingredientList]); 
                                    history.push("/graph");
                                    model.setCurrentRecipeName(recipe.name);
                                }}>
                            {recipe.name}
                            </p>
                            <div className="recipie-dougnut">
                                <StoredPageDougnut sumObject={model.sumList(recipe.ingredientList)} height={20} width={25}/>
                            </div>
                            <button id="recipe-remove" onClick={()=>removeRecipe(recipe.name)}>Remove</button>
                    </div>    
                )}
                
            </div>
        </div>
  
}

export default StoredView;