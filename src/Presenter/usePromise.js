import React from 'react';

function usePromise(promise) {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(function() {
        setData(null); // Necessary 
        setError(null); // Necessary
        if ((promise !== null) && (promise !== undefined)){
            promise.then(response => setData(response)).catch(error => setError(error));
        }
    }, 
    [promise]); 
    return [data, error];
};

function promiseNoData(promise, data, error, h) {
  return (!promise && "") // Case 0  // removed text for now since the first promise will be without data
          || (error && <h1 id="no-ingredient">No ingredient is found!</h1>) // Case 1 
          || (!data && <img src={data} alt=""/>) // Case 2;
};

export { 
    usePromise, 
    promiseNoData
};
