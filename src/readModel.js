import NutritionModel from "./Model/nutritionModel.js";
import {ReadFromFirebase} from '../src/Firebase/firebaseFunc';

function readModel() {
    const modelString = localStorage.getItem("NutritionModel"); // gets the props from storage in JSON
    // If modelString is defined parse
    let modelObject = modelString ? JSON.parse(modelString) : {}; // convert JSON to object
    
    const model = new NutritionModel(modelObject.ingredientList, modelObject.currentingredient);
    
    ReadFromFirebase({model});
    
    const storageobs = () => {localStorage.setItem("NutritionModel",  //sets model w prop to local storage
       JSON.stringify({ 
            ingredientList: model.getingredientList(),
            currentingredient: model.getCurrentingredient()
           //newMol : model.getMolObject()}
     }) )};

    model.addObserver(storageobs);  
    return model;
}

export default readModel;