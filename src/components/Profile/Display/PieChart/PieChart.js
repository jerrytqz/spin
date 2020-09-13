import React from 'react'; 
import classes from './PieChart.module.css';
import {Pie} from 'react-chartjs-2'; 

const pieChart = (props) => {
    const data = {
        labels: ['Common', 'Uncommon', 'Rare', 'Epic', 'Holy', 'Godly', '???'],
        datasets: [{
            backgroundColor: [
                'brown',
                'cyan',
                'red',
                'purple',
                'orange',
                'yellow',
                'black'
            ],
            data: [props.rarityStats.common, props.rarityStats.uncommon, props.rarityStats.rare, props.rarityStats.epic, props.rarityStats.holy, props.rarityStats.godly, props.rarityStats['???']]
        }]
    }

    const options = {
        legend: {
            display: false
        },
        animation: {
            duration: 500
        },
        maintainAspectRatio: false,
        elements: {
            arc: {
                borderWidth: 0 
            }
        }
    }

    return (props.totalSpins !== 0 ? 
        <div className={classes.PieChart}>
            <Pie
                data={data}
                width={400}
                height={400}
                options={options}/>
        </div> :
        <div className={classes.PieChartNullText}>Nothing to show!</div>
    )
}

export default pieChart; 
