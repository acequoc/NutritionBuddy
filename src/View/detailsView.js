import React from 'react';
import DetailsCard from './DetailsCard';

const DetailsView = (recipeList) => {
    const chartCards = recipeList.recipeList.map( (ingredList) => {
        <DetailsCard recipe={ingredList}/>
    });
    
    return (
        <div>
            <h1>Details/Macros</h1>
            <p>
                On this page is all your recipes 
            </p>
            {chartCards}
            <iframe
                allow="microphone;"
                width="350"
                height="430"
                src="https://console.dialogflow.com/api-client/demo/embedded/f220c8ac-06e2-4203-8f1a-b88b37261613">
            </iframe>
        </div>
    )
}

export default DetailsView;