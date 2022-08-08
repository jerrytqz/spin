import React from 'react';
import Rarity from './Rarity/Rarity'; 
import classes from './SpinInfo.module.css';
import { RARITY_INFO } from '../../shared/utility'; 

const SpinInfo = () => {
    const rarities = [];
    for (const property in RARITY_INFO) {
        rarities.push(
            <Rarity
                key={RARITY_INFO[property][1]}
                rarityType={property}
                rarityChance={RARITY_INFO[property][3]}
                rarityColor={RARITY_INFO[property][0]}
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
