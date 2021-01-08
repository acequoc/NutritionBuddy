import React from 'react';
import SidebarView from '../View/SidebarView';
import Save from './save';
import useModelProp from './useModelProp';

function Sidebar({model}) {    
    const ingredientList = useModelProp(model, "ingredientList"); 
    return <div className = "sidebar">
                <SidebarView 
                    ingredientList={ingredientList} 
                    sumList = {model.sumingredientList()}
                    onRemove={(remove) => model.removeFromList(remove)}
                    />
                {!ingredientList.length ? <p></p> : 
                
                <Save model={model}/>}
            </div>
}

export default Sidebar;
 

