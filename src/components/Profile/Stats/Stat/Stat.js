import React from 'react'; 
import classes from './Stat.module.css'; 

const stat = (props) => {
    let rarityCircleClasses = [classes.RarityCircle];
    if (props.rarityColor === 'rainbow') {
        rarityCircleClasses.push(classes.Rainbow); 
    }

    return (
        <div className={classes.Stat}>
            <div className={classes.StatLeft}>
                {props.rarityColor ? <div className={rarityCircleClasses.join(' ')} style={{backgroundColor: props.rarityColor}}/> : null}
                <div className={classes.StatName}>{props.statName}</div>
            </div>
            <div>{props.statValue}</div>
        </div>
    )
}

export default stat; 
