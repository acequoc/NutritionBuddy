import { Doughnut} from 'react-chartjs-2'

function StoredPageDougnut({sumObject, height, width}) {
    const macroNames = Object.keys(sumObject);
    const macroValues = Object.values(sumObject);

    return <Doughnut
        data={{
          labels: [macroNames[1],macroNames[2],macroNames[3],macroNames[4]],
          datasets: [
            {
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
          height={height}
          width={width}
          options={{
            maintainAspectRatio: false
          }}
    />
} 
export default StoredPageDougnut;