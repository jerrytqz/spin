import React from 'react'; 
import classes from './Stats.module.css';
import Stat from './Stat/Stat';  
import {capitalize, mapRarityToColor} from '../../../shared/Functions/utility'; 

const stats = (props) => {
    let rarityStats = []; 
    if (props.stats.rarityStats) {
        const rawRarityStats = Object.entries(props.stats.rarityStats);
        for (const [rarity, value] of rawRarityStats) {
            const percent = (value/props.stats.totalSpins)*100
            console.log(percent)
            rarityStats.push(<Stat 
                key={rarity}
                statName={capitalize(rarity)}
                statValue={percent.toFixed(2)+"%"}
                rarityColor={mapRarityToColor(capitalize(rarity))}/>)
        }
    }

    return (
        <div className={classes.Stats}>
            <div className={classes.StatsHeader}>STATS</div>
            <Stat statName="SP" statValue={props.stats.SP}/>
            {/* <Stat statName="NET SP" statValue={props.stats.netSP}/> WIP */}
            <Stat statName="Total Spins" statValue={props.stats.totalSpins}/>
            <Stat statName="Items Found" statValue={`${props.stats.itemsFound}/${props.stats.totalSpinItems}`}/>
            <Stat statName="??? Unboxed" statValue={props.stats.rarityStats["???"]}/>
            {/* <Stat statName="LUCK RATING" statValue={props.stats.luckRating}/> WIP */}
            <hr className={classes.Separator}/>
            {rarityStats}
        </div>
    )
}

export default stats; 
