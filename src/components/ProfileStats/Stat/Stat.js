import React from 'react'; 
import classes from './Stat.module.css';
import {TQ, RARITY_INFO} from '../../../shared/utility'; 

const Stat = (props) => {
    const rarityCircleClasses = [classes.RarityCircle];
    if (props.rarityColor === RARITY_INFO[TQ][0]) {
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
    );
};

export default Stat; 
