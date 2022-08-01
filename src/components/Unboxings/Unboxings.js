import React from 'react';
import classes from './Unboxings.module.css';
import { rarityInfo } from '../../shared/utility'; 

const unboxings = (props) => {
    const unboxings = [
        <div key={0} className={classes.Message}>Global unboxings show up here!</div>
    ];
    for (let i = 1; i < 10; i++) {
        unboxings.push(<div key={i} className={classes.Placeholder}>Placeholder</div>); 
    }
    
    for (let i = 0; i < props.unboxings.length; i++) {
        let colorClass = null;
        const color = rarityInfo[props.unboxings[i].rarity][0]; 
        if (color === 'rainbow') {
            colorClass = classes.Rainbow; 
        }
        unboxings.splice(i, 1, 
            <div key={i}>
                <strong>{props.unboxings[i].unboxer}</strong> unboxed <div className={colorClass} style={{display: 'inline', color: color}}>{props.unboxings[i].itemName}</div>
            </div>
        );
    }

    return (
        <div className={classes.Unboxings}>
            {unboxings}
        </div>
    );
};

export default unboxings; 
