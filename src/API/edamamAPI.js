
//import {BASE_URL, API_KEY} from './configAPI.js';
const EdamamSource={
    apiCall(params) {
        function handleHTTPError(response) {
            if(response.ok)
               return response;
            throw Error(response.statusText);
          };
          
          return fetch("https://edamam-food-and-grocery-database.p.rapidapi.com/parser"+ params, {
            "method": "GET",
            "headers": {
            "x-rapidapi-key": "e3fb1e3aadmsh4f34f41abb8fda6p1bda2bjsn84fb0868770f",
            "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
          }
     }).then(handleHTTPError)
     
    // from headers to response data
    .then(response => response.json()).catch(console.error);  
    }
    ,    
    searchIngredient(query) { 
        if(query === ""){  //to prevent error from happening while setting the promise
            return null
        }
        const trimQuery = query.replace(/\s/g, '%20'); // replace space with %20
        const paramsString = "?" + 
        (query === undefined ? "" : "ingr=" + trimQuery);

       return this.apiCall(paramsString) 
       //data.parsed[0].food) 
        .then(data => data.parsed[0].food);       // leave out the unimportant parts of the response data
     
    }
    
 }; 
 
export default EdamamSource;