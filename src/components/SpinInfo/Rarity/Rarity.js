import React from 'react';
import classes from './Rarity.module.css';

const rarity = (props) => (
    <li className={classes.Rarity}>
        <p className={classes.RarityText}>{props.rarity} ({props.chance})</p>
        <div className={classes.RaritySquare} style={{background: props.rarityColor, animation: props.animation}}/>
    </li>
)

export default rarity; 
