import React from 'react';
import classes from './Rarity.module.css';

const rarity = (props) => {
    const rarityClasses = [classes.RaritySquare];  
    if (props.animation === 'rainbow') {
        rarityClasses.push(classes.Rainbow); 
    }

    return (
        <li className={classes.Rarity}>
            <p className={classes.RarityText}>{props.rarityType} ({props.rarityChance})</p>
            <div className={rarityClasses.join(' ')} style={{background: props.rarityColor}}/>
        </li>
    );
};

export default rarity; 
