import React, {Fragment} from 'react';
import { useHistory } from 'react-router';
import capString from "../Presenter/capString";

// JSX
function SidebarView({ingredientList, sumList, onRemove}){
   const history = useHistory();

   return (<div>
            <h2>
               <span>Ingredients</span>
            </h2>
            <Fragment>
               <br></br>
            <table className="table">
               <thead >
                  <tr>
                     <th ></th>
                     <th className="table-elem"></th>
                     <th className="table-elem">Fat</th>
                     <th className="table-elem">Carbs</th>
                     <th className="table-elem">Protein</th>
                     <th className="table-elem">Amount</th>
                  </tr>
               </thead>
               {ingredientList.length === 0 ? history.push("/graph") 
               :
               ingredientList.map(ingred =>
                  <tbody key={ingred.name} >
                  <tr> 
                     <td>{capString(ingred.name)}</td>
                     <td>
                        <button className="graph-button" onClick={()=> onRemove(ingred.name)}>x</button> 
                     </td>
                     <td className="table-elem" id="fat" >
                        {((ingred.fat*(ingred.amount/100)).toFixed(1))}g
                     </td>
                     <td className="table-elem" id="carbs">
                        {((ingred.carbs*(ingred.amount/100)).toFixed(1))}g
                     </td>
                     <td className="table-elem" id="protein">
                        {((ingred.protein*(ingred.amount/100)).toFixed(1))}g
                     </td>
                     <td className="table-elem">
                        {ingred.amount}g
                     </td>
                  </tr>
                  </tbody>)}
            </table>
            <br></br>
               <div id="sidebar-total">
                  <br></br>
                  <h3 >Total protein: {sumList.protein === null ? <span id="protein">0g</span> : <span id="protein">{sumList.protein.toFixed(1)}g</span>}</h3>
                  <h3 >Total carbohydrates: {sumList.carbs === null ?<span id="carbs">0g</span>: <span id="carbs">{sumList.carbs.toFixed(1)}g</span>}</h3>
               <h3 >Total fat: {sumList.fat === null ?<span id="fat">0g</span>: <span id="fat">{sumList.fat.toFixed(1)}g</span>}</h3>
                  <br></br>
               </div>
            <div id="sidebar-total">
               <br></br>
            </div>
         </Fragment>
            
   </div>)
}

export default SidebarView;
