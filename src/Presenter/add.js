import React from 'react';
import {createElement as h} from "react";
import {usePromise, promiseNoData} from "./usePromise.js";
import EdamamSource from '../API/edamamAPI.js';
import { AddResultsView, AddForm } from '../View/addView.js';

function Add({model}) {
    // Relevant to API query 
    const [promise, setPromise] = React.useState(null); // Init with and empty promise because errors on line 10 otherwise
    React.useEffect(() => setPromise(EdamamSource.searchIngredient("")), []);
    const [data, error] = usePromise(promise); 

    return h(React.Fragment, {}, 
        h(AddForm, 
            {onSearch: (text) => setPromise(EdamamSource.searchIngredient(text))}), 
            promiseNoData(promise, data, error) || 
            h(AddResultsView, {
                    searchResults: data, 
                    model: model,
                    addMol: (obj, text) => 
                        {
                            model.setCurrentingredient(model.setIngredientObject(obj, text)); 
                            model.addToingredientList(model.getCurrentingredient());
                        }
                          // this will make several object for the same thing
                })
        );
}


export default Add;