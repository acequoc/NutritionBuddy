import React from 'react'
import { Doughnut, defaults } from 'react-chartjs-2'
import Add from "../Presenter/add.js";
import Sidebar from "../Presenter/Sidebar";
import useModelProp from '../Presenter/useModelProp.js';

defaults.global.tooltips.enabled = true
defaults.global.legend.position = 'bottom'
defaults.global.defaultFontColor = 'white' 

const Graph = ({model}) => { 
  const ingredientList = useModelProp(model, "ingredientList");
  const mergedList = model.sumingredientList();
  const macroNames = Object.keys(mergedList);
  const macroValues = Object.values(mergedList);
  
  return (
    <div className="graph-bg">
      <div className = "flexGraph">
        <div className = "graphContainer">
          <h1> 
            <br></br>
            <span className="headerColor">Your Recipe's Macronutrients</span> 
          </h1>
          {Add({model})}
          <div className = "graph">
            {ingredientList.length===0? <p id="expandPage"></p> :(
              <Doughnut
                data={{
                  labels:[macroNames[1],macroNames[2],macroNames[3],macroNames[4]],
                  datasets: [{
                    label: mergedList.name,
                    data: [(macroValues[1]).toFixed(1), (macroValues[2]).toFixed(1), (macroValues[3]).toFixed(1), (macroValues[4]).toFixed(1)],
                    backgroundColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  }],
                }}

                height={550}
                width={500}
                options={{
                  maintainAspectRatio: false,
                  title: {
                    display:true,
                    text: [mergedList.name], 
                    fontSize: 20,
                    fontFamily: 'Arial',
                    fontColor: "#fff", 
                    padding: 10
                  }
                }}
              />
            )}
          </div>
        </div>
        <Sidebar model={model}/>
      </div>
    </div>
  )
}

export default Graph;
