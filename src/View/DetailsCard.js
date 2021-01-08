
import { Doughnut, defaults } from 'react-chartjs-2'

const DetailsCard = (recipe) => {

    // const reducer = () => 
    //const totalFat = recipe.length !== 0 ? recipe.reduce((acc, currentValue) => acc = acc + currentValue.fat) : 0;
    //const totalCarbs = recipe.length !== 0 ? recipe.reduce((acc, currentValue) => acc = acc + currentValue.carbs) : 0;
    //const totalProtein = recipe.length !== 0 ? recipe.reduce((acc, currentValue) => acc = acc + currentValue.protein) : 0;

    const macroNames = Object.keys(recipe);
    const macroValues = Object.values(recipe);

    return <span>
        <Doughnut
            data={{
                labels: [macroNames[1],macroNames[2],macroNames[3],macroNames[4]],
                datasets: [
                    {
                    label: recipe.name,
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
                    },
                ],
            }}
            height={1}
            width={2}
            options={{
                maintainAspectRxatio: false,
                title: {
                    display:true,
                    text: recipe.name.toUpperCase()
                }
            }}        
        />
        {/* <p>{totalFat}</p>
        <p>{totalCarbs}</p>
        <p>{totalProtein}</p> */}
        <button onClick={console.log("Delete this item from list")}>Delete</button>
    </span>
}

export default DetailsCard;