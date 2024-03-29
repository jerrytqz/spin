import React from 'react';
import classes from './Unboxings.module.css';
import { TQ, RARITY_INFO } from '../../shared/utility'; 

const Unboxings = (props) => {
    const unboxings = [
        <div key={0} className={classes.Message}>Global unboxings show up here!</div>
    ];
    for (let i = 1; i < 10; i++) {
        unboxings.push(<div key={i} className={classes.Placeholder}>Placeholder</div>); 
    }
    
    for (let i = 0; i < props.unboxings.length; i++) {
        let colorClass = null;
        const color = RARITY_INFO[props.unboxings[i].rarity][0]; 
        if (props.unboxings[i].rarity === TQ) {
            colorClass = classes.Rainbow; 
        }
        unboxings.splice(i, 1, 
            <div key={i} style={{whiteSpace: 'nowrap'}}>
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

export default Unboxings; 
