import React from 'react';
import classes from './Prize.module.css'; 

const prize = (props) => {
    let rarity = null;
    let rarityColor = null; 
    let article = 'a'; 
    let animation = 'none'; 
    
    if ((0 <= props.angle && props.angle < 187.2) || props.angle === 360) { //not going to hit 360, but just in case
        rarity = 'common';
        rarityColor = 'brown'; 
    } 
    else if (187.2 <= props.angle && props.angle < 259.2) {
        rarity = 'uncommon'; 
        rarityColor = 'cyan'; 
        article = 'an'; 
    }
    else if (259.2 <= props.angle && props.angle < 313.2) {
        rarity = 'rare'; 
        rarityColor = 'red'; 
    }
    else if (313.2 <= props.angle && props.angle < 349.2) {
        rarity = 'epic'; 
        rarityColor = 'purple'; 
        article = 'an'; 
    }
    else if (349.2 <= props.angle && props.angle < 356.4) {
        rarity = 'holy'; 
        rarityColor = 'orange'; 
    }
    else if (356.4 <= props.angle && props.angle < 359.964) {
        rarity = 'godly'; 
        rarityColor = 'yellow'; 
    }
    else if (359.964 <= props.angle && props.angle < 360) {
        rarity = '???'; 
        animation = 'changingColor 1s linear infinite;'; 
    } 

    let prizeClasses = [classes.Prize];
    if (props.showPrize) {
        prizeClasses.push(classes.PrizeOpen); 
    }
    
    return (
        <div className={prizeClasses.join(' ')}>
            You unboxed {article} <strong className={classes.RarityText} style={{color: rarityColor, animation: animation}}>{rarity}</strong> item! 
        </div>
    )
}

export default prize; 
