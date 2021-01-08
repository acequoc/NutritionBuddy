import {createElement as h} from "react";
import SaveView from '../View/saveView.js';
import useModelProp from './useModelProp';

function Save({model})
{
    const ingredientListName = useModelProp(model, "currentRecipeName");
    

    return  h(SaveView, {
            ingListName: ingredientListName,
            nameMol: name=> {
                model.checkRecipe(name);
                //model.addToNameList(name);
            },
            saveName: name=>model.setCurrentRecipeName(name)
    })
}

export default Save;