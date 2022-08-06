import React from 'react'; 
import classes from './PieChart.module.css';
import { Pie } from 'react-chartjs-2'; 
import { rarityInfo } from '../../../shared/utility'; 

const PieChart = (props) => {
    const labels = [];
    const backgroundColor = [];
    for (const property in rarityInfo) {
        labels.push(property); 
        backgroundColor.push(rarityInfo[property][0]); 
    }
    backgroundColor[backgroundColor.length - 1] = 'black'; 

    const data = {
        labels: labels,
        datasets: [{
            backgroundColor: backgroundColor,
            data: [props.rarityStats.common, props.rarityStats.uncommon, props.rarityStats.rare, props.rarityStats.epic, props.rarityStats.holy, props.rarityStats.godly, props.rarityStats['???']]
        }]
    };

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
    };

    return (
        props.totalSpins !== 0 
            ? 
                <div className={classes.PieChart}>
                    <Pie
                        data={data}
                        width={400}
                        height={400}
                        options={options}
                    />
                </div> 
            : <div className={classes.PieChartNullText}>Nothing to show!</div>
    );
};

export default PieChart; 
