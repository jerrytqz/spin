import React from 'react';
import classes from './Rarity.module.css';

const rarity = (props) => (
    <li className={classes.Rarity}>
        <p className={classes.RarityText}>{props.rarityType} ({props.rarityChance})</p>
        <div className={classes.RaritySquare} style={{background: props.rarityColor, animation: props.animation}}/>
    </li>
)

export default rarity; 
