import {createElement as h} from "react";
import StoredView from '../View/storedView.js';
import useModelProp from './useModelProp';

function Stored({model})
{   
    const data = useModelProp(model, "recipeList");

    return h(StoredView,{
                reList: data,
                model: model,
                removeRecipe: remove => model.removeFromRecipeList(remove),
                clearL: clear => model.clearList(clear)
            }) 
}

export default Stored;