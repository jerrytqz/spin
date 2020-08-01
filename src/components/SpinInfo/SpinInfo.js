import React from 'react';
import Rarity from './Rarity/Rarity'; 
import classes from './SpinInfo.module.css';

const spinInfo = () => (
    <ul className={classes.SpinInfo}>
        <Rarity rarity="Common" chance="52%" rarityColor="brown" animation="none"/>
        <Rarity rarity="Uncommon" chance="20%" rarityColor="cyan" animation="none"/>
        <Rarity rarity="Rare" chance="15%" rarityColor="red" animation="none"/>
        <Rarity rarity="Epic" chance="10%" rarityColor="purple" animation="none"/>
        <Rarity rarity="Holy" chance="2%" rarityColor="orange" animation="none"/>
        <Rarity rarity="Godly" chance="0.99%" rarityColor="yellow" animation="none"/>
        <Rarity rarity="???" chance="0.01%"/>
    </ul>
)

export default spinInfo; 
