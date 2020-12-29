import React from 'react'; 
import classes from './Stats.module.css';
import Stat from './Stat/Stat';  
import {capitalize, mapRarityToColor, numberWithCommas} from '../../../shared/utility'; 

const stats = (props) => {
	let rarityStats = []; 
	if (props.stats.rarityStats) {
		if (props.stats.totalSpins === 0) {
			const rawRarityStats = Object.keys(props.stats.rarityStats);
			for (const rarity of rawRarityStats) {
				rarityStats.push(<Stat 
					key={rarity}
					statName={capitalize(rarity)}
					statValue="0%"
					rarityColor={mapRarityToColor(capitalize(rarity))}/>);
			}
		} else {
			const rawRarityStats = Object.entries(props.stats.rarityStats);
			for (const [rarity, value] of rawRarityStats) {
				const percent = (value/props.stats.totalSpins)*100;
				rarityStats.push(<Stat 
					key={rarity}
					statName={capitalize(rarity)}
					statValue={percent.toFixed(2)+'%'}
					rarityColor={mapRarityToColor(capitalize(rarity))}/>);
			}
		}
	}
    
	return (
		<div className={classes.Stats}>
			<div className={classes.StatsHeader}>STATS</div>
			<Stat statName="SP" statValue={numberWithCommas(props.stats.SP)}/>
			<Stat statName="Net SP" statValue={numberWithCommas(props.stats.netSP)}/>
			<Stat statName="Total Spins" statValue={numberWithCommas(props.stats.totalSpins)}/>
			<Stat statName="Items Found" statValue={`${props.stats.itemsFound}/${props.stats.totalSpinItems}`}/>
			<Stat statName="??? Unboxed" statValue={numberWithCommas(props.stats.rarityStats['???'])}/>
			<hr className={classes.Separator}/>
			{rarityStats}
		</div>
	);
};

export default stats; 
