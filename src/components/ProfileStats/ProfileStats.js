import React from 'react'; 
import classes from './ProfileStats.module.css';
import Stat from './Stat/Stat';  
import { TQ, RARITY_INFO, capitalize, numberWithCommas } from '../../shared/utility'; 

const ProfileStats = (props) => {
    const rarityStats = []; 
    if (props.stats.rarityStats) {
        if (props.stats.totalSpins === 0) {
            const rawRarityStats = Object.keys(props.stats.rarityStats);
            for (const rarity of rawRarityStats) {
                rarityStats.push(
                    <Stat 
                        key={rarity}
                        statName={capitalize(rarity)}
                        statValue="0%"
                        rarityColor={RARITY_INFO[capitalize(rarity)][0]}
                    />
                );
            }
        } else {
            const rawRarityStats = Object.entries(props.stats.rarityStats);
            for (const [rarity, value] of rawRarityStats) {
                const percent = (value/props.stats.totalSpins)*100;
                rarityStats.push(
                    <Stat 
                        key={rarity}
                        statName={capitalize(rarity)}
                        statValue={`${percent.toFixed(2)}%`}
                        rarityColor={RARITY_INFO[capitalize(rarity)][0]}
                    />
                );
            }
        }
    }
    
    return (
        <div className={classes.Stats}>
            <div className={classes.StatsHeader}>STATS</div>
            <Stat statName="SP" statValue={numberWithCommas(props.stats.sp)}/>
            <Stat statName="Net SP" statValue={numberWithCommas(props.stats.netSP)}/>
            <Stat statName="Total Spins" statValue={numberWithCommas(props.stats.totalSpins)}/>
            <Stat statName={`${TQ} Unboxed`} statValue={numberWithCommas(props.stats.rarityStats[TQ])}/>
            <hr className={classes.Separator}/>
            {rarityStats}
        </div>
    );
};

export default ProfileStats; 
