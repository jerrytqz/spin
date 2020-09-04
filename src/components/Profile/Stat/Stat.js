import React from 'react'; 
import classes from './Stat.module.css'; 

const stat = (props) => {
    return (
        <div className={classes.Stat}>
            <div className={classes.StatName}>{props.statName}</div>
            <div>{props.statValue}</div>
        </div>
    )
}

export default stat; 
