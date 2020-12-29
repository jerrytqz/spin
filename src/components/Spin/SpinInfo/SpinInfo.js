import React from 'react';
import Rarity from './Rarity/Rarity'; 
import classes from './SpinInfo.module.css';

const spinInfo = () => (
	<div className={classes.SpinInfo}>
		<Rarity rarityType="Common" rarityChance="52%" rarityColor="brown"/>
		<Rarity rarityType="Uncommon" rarityChance="20%" rarityColor="cyan"/>
		<Rarity rarityType="Rare" rarityChance="15%" rarityColor="red"/>
		<Rarity rarityType="Epic" rarityChance="10%" rarityColor="purple"/>
		<Rarity rarityType="Holy" rarityChance="2.5%" rarityColor="orange"/>
		<Rarity rarityType="Godly" rarityChance="0.49%" rarityColor="yellow"/>
		<Rarity rarityType="???" rarityChance="0.01%" animation="rainbow"/>
	</div>
);

export default spinInfo; 
