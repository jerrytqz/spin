import React from 'react';
import { TQ, RARITY_INFO } from '../../../shared/utility';
import classes from './Rarity.module.css';

const Rarity = (props) => {
    const rarityClasses = [classes.RaritySquare];  
    if (props.rarityColor === RARITY_INFO[TQ][0]) {
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
