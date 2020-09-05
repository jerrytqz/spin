import React from 'react'; 
import classes from './Stats.module.css';
import Stat from './Stat/Stat';  

const stats = (props) => {
    return (
        <div className={classes.Stats}>
            <div className={classes.StatsHeader}>STATS</div>
            <Stat statName="SP" statValue={props.stats.SP}/>
            {/* <Stat statName="NET SP" statValue={props.stats.netSP}/> WIP */}
            <Stat statName="TOTAL SPINS" statValue={props.stats.totalSpins}/>
            <Stat statName="??? UNBOXED" statValue={props.stats['???Unboxed']}/>
            <Stat statName="ITEMS FOUND" statValue={`${props.stats.itemsFound}/${props.stats.totalSpinItems}`}/>
            {/* <Stat statName="LUCK RATING" statValue={props.stats.luckRating}/> WIP */}
        </div>
    )
}

export default stats; 
