import capString from "../Presenter/capString"
import {SaveToFirebase, RemoveFromDatabase, UpdateFirebase} from '../Firebase/firebaseFunc';

class NutritionModel{
    constructor(ingredientList = [], currentingredient = undefined){
        this.subscribers = [];
        this.recipeList = [];
        this.ingredientList = ingredientList;  
        this.currentingredientListName = "";
        this.currentingredient = currentingredient;
        this.currentRecipeName = "";
        this.currentRecipeList = [];
        this.recipeKeys = [];
        this.reNameList = [];
        this.fixedName = "";
        this.userID = undefined;
    }

    emptyList(){
        this.recipeList = [];
        //return this.recipeList;
    }

    /********** USER_ID **********/
    setUserID(id){
        this.userID = id;
        this.notifyObservers();
    }

    getUserID(){
        return this.userID;
    }

    /********** CURRENT_ingredient ********/
    setCurrentingredient(obj) {
        this.currentingredient = obj; 
        this.notifyObservers();
    }

    getCurrentingredient() {  // Current ingredient
        return this.currentingredient; 
    }

    setCurrentIngredientList(recipe) {
        this.ingredientList = recipe;
        this.notifyObservers();
    }

    setCurrentIngredientListName(name) {
        this.currentingredientListName = name;
        this.notifyObservers();
    }

    getCurrentIngredientListName() {
        return this.currentingredientListName;
    }

    /********** MOL_OBJECT **********/
    setIngredientObject(ing, quantity){  // initialize ingredient object
        var IngredientObj ={
            name : "", 
            fat : null,
            carbs : null,
            fiber : null,
            protein : null,
            amount : null
        }        

        IngredientObj.name = ing.label; // efter den här ändras elementet i listan till objektet
        IngredientObj.fat = ing.nutrients.FAT;
        IngredientObj.carbs = ing.nutrients.CHOCDF;
        IngredientObj.fiber = ing.nutrients.FIBTG;
        IngredientObj.protein = ing.nutrients.PROCNT;

        
        IngredientObj.amount = parseInt(quantity !== "" ? quantity : "100");    
        
        
        this.setCurrentingredient(IngredientObj);
        return IngredientObj;
    }
    
    /********** ingredient_LIST **********/
    nameYouringredientList(name) {
        const customizedMol = this.getCurrentingredient();
        customizedMol.id=name;
        this.addToingredientList(customizedMol);
    }

    getingredientList() { // more than one ingredient object
        return [...this.ingredientList];
    }

    sumingredientList() {   //Used to sum up the ingredients values for the graph presentation
        var sumObj ={
            name : "", 
            fat : null,
            carbs : null,
            fiber : null,
            protein : null
        }
        const molList = this.getingredientList() 
        molList.forEach(element =>  // sums all elements from molecule list
            (sumObj.name += " + " + capString(element.name), // to capitalize first letter in each ing
            sumObj.fat += element.fat*(element.amount/100),
            sumObj.carbs += element.carbs*(element.amount/100), 
            sumObj.fiber += element.fiber*(element.amount/100), 
            sumObj.protein += element.protein*(element.amount/100))
            )
            sumObj.name = sumObj.name.substring(3); // used to remove the first plus sign
        return sumObj; 
    }

    emptyRecipeList() {
        this.recipeList = []
    }

    sumList(ingredientList) {   //Used to sum up the ingredients values for the graph presentation
        var sumObj ={
            name : "", 
            fat : null,
            carbs : null,
            fiber : null,
            protein : null
        }
        
        ingredientList.forEach(element =>  // sums all elements from molecule list
            (sumObj.name += " + " + capString(element.name), // to capitalize first letter in each ing
            sumObj.fat += element.fat*(element.amount/100),
            sumObj.carbs += element.carbs*(element.amount/100), 
            sumObj.fiber += element.fiber*(element.amount/100), 
            sumObj.protein += element.protein*(element.amount/100))
            )
            sumObj.name = sumObj.name.substring(3); // used to remove the first plus sign
        return sumObj; 
    }

    addToingredientList(obj) {
        if(!this.ingredientListHas(obj)){
            alert("Ingredient is already in graph");
        }
        else{
            this.ingredientList = [obj, ...this.ingredientList];
        }
        
        this.notifyObservers(); 
    }

    alreadySearched(searchResults){
        var check = false;
        if (this.currentingredient !== undefined){            
            if(this.currentingredient.name === searchResults.label) {
                check = true;
            }
        }
        return check
    }

    
    ingredientListHas(item) {
        let check = true;
		var index=0;
		while(index<this.ingredientList.length)
		{
			if(item.name === this.ingredientList[index].name)
			{
				check=false; 
				break;
			}
			index++;
		}
		return check;
    }

    removeFromList(name){
        this.ingredientList = this.ingredientList.filter(function(remove){return remove.name!==name;});
        if(this.currentingredient && name === this.currentingredient.name){
            this.currentingredient = undefined
        }
        this.notifyObservers();
    }

    /********** RECIPE_LIST **********/
    removeFromRecipeList(name) {
        const recipeID = this.recipeKeys.filter( (elem) => elem.name === name);

        this.recipeList = this.recipeList.filter( (elem) => elem.name !== name);

        if (recipeID.length) {
            for(var i = 0; i < this.recipeKeys.length; i++)
            if(this.recipeKeys[i].name === name) { 
                this.recipeKeys.splice(i,1)
            }

            RemoveFromDatabase(recipeID[0].key);
        } else {
            alert("Recipe does not exist");
        }
        
        this.notifyObservers();
    }
    addToNameList(reName){
        this.reNameList = [reName,...this.reNameList];
        this.notifyObservers();
    }

    nameYourRecipeList(name) 
    {
        // console.log("nameYourRecipeList is running...");
        this.currentRecipeName = name;
        const recipe = {
            name: name,
            ingredientList: this.getingredientList()
        }

        this.addToRecipeList(recipe);
    }

    addToRecipeList(recipe) {
        if(!this.recipeListHas(recipe.name)){
            
            const recipeName = this.modiName(recipe.name);
            recipe.name = recipeName;
            const key = SaveToFirebase(recipe);

            const recipeKey = {
                key: key,
                name: recipeName
            };

            this.addToNameList(recipeName);
            this.addToRecipeKeys(recipeKey);

            alert("The name is already taken, '_1' adds to the name");
            this.notifyObservers();
        }
        else {
            const key = SaveToFirebase(recipe);

            const recipeKey = {
                key: key,
                name: recipe.name
            };
            
            this.addToNameList(recipe.name);
            this.addToRecipeKeys(recipeKey);
            this.notifyObservers();
        }
    }

    recipeListHas(recipeName) {
        let check = true;
		for(var i = 0; i < this.recipeKeys.length; i++)
		{
			if(recipeName === this.recipeKeys[i].name)
			{
				check=false; 
				break;
			}
		}
		return check;
    }

    modiName(name){
        const modName = name;
        this.fixedName = modName + "_1";
        return this.fixedName;
    }

    setRecipeKeys(keyList) {
        this.recipeKeys = keyList;
    }

    addToRecipeKeys(keyObject) {
        this.recipeKeys = [keyObject, ...this.recipeKeys];
    }

    getRecipeList(){ 
        return [...this.recipeList];
    }

    setRecipeList(recipeList) {
        this.recipeList = recipeList;
        this.notifyObservers();
    }

    /********** CLEAR_ARRAY **********/
    clearList(i) {
        if(i!==null){
            this.currentingredient = undefined;
            this.ingredientList.splice(0,this.ingredientList.length);
            this.currentRecipeName = "";
        }
    }

    /********** MODIFY_RECIPE **********/
    setCurrentRecipeName(name){
        this.currentRecipeName = name;
        this.notifyObservers();
    }
    getCurrentRecipeName(){
        return this.currentRecipeName;
    }

    checkRecipe(newName){
        const recipeOldName = this.getCurrentRecipeName();

        if(newName === recipeOldName)
        {
            const recipeID = this.recipeKeys.filter( (elem) => elem.name === newName);
            
            if (recipeID.length) {
                UpdateFirebase(recipeID[0].key, recipeID[0].name, this.getingredientList());
                this.setCurrentRecipeName(undefined);
            }
        }
        else {
            const recipeID = this.recipeKeys.filter( (elem) => elem.name === recipeOldName);
            if (recipeID.length) {
                this.nameYourRecipeList(newName);
                RemoveFromDatabase(recipeID[0].key);
            
                for(var i = 0; i < this.recipeKeys.length; i++)
                if(this.recipeKeys[i].name === recipeOldName) { 
                    this.recipeKeys.splice(i,1)
                }
                this.setCurrentRecipeName(undefined);
            }
            else{
                this.nameYourRecipeList(newName);
            }
        }

        this.notifyObservers();
    }


    /********** OBSERVER **********/
    addObserver(obs) { 
        this.subscribers = this.subscribers.concat(obs);  
        return ()=>this.removeObserver(obs);                             
        }

    notifyObservers(){
        this.subscribers.forEach((callback)=> {
            try{callback()} catch(err){
                console.error("Error ", err, callback);}
        });                                                      
    }
    removeObserver(obs){
        this.subscribers = this.subscribers.filter(o=> o !== obs); 
    }
}

export default NutritionModel;