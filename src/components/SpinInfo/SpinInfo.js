import React from 'react';
import Rarity from './Rarity/Rarity'; 
import classes from './SpinInfo.module.css';
import { rarityInfo } from '../../shared/utility'; 

const SpinInfo = () => {
    const rarities = [];
    for (const property in rarityInfo) {
        rarities.push(
            <Rarity
                key={rarityInfo[property][1]}
                rarityType={property}
                rarityChance={rarityInfo[property][3]}
                rarityColor={rarityInfo[property][0]}
            />
        )
    }
    return (
        <div className={classes.SpinInfo}>
            {rarities}
        </div>
    );
};

export default SpinInfo; 
