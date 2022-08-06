import React from 'react';
import classes from './Rarity.module.css';

const Rarity = (props) => {
    const rarityClasses = [classes.RaritySquare];  
    if (props.rarityColor === 'rainbow') {
        rarityClasses.push(classes.Rainbow); 
    }

    return (
        <li className={classes.Rarity}>
            <p className={classes.RarityText}>{props.rarityType} ({props.rarityChance})</p>
            <div className={rarityClasses.join(' ')} style={{background: props.rarityColor}}/>
        </li>
    );
};

export default Rarity; 
