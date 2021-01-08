import React from 'react';
import DetailsView from '../View/detailsView';
import Sidebar from './Sidebar';
import useModelProp from './useModelProp';

const Details = ({model}) => {
    // React useEffects and useState
    const recipeList = useModelProp(model, "recipeList");
    
    return (
        <div>
            <DetailsView recipeList={recipeList}  />
            {/* <Sidebar model={model} />     */}
        </div>
        )
}

export default Details;