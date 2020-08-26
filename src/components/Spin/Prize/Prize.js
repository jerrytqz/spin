import React from 'react';
import classes from './Prize.module.css'; 
import Modal from '../../../shared/UI/Modal/Modal'; 

const prize = (props) => {
    let rarityType = null;
    let rarityColor = null; 
    let article = 'a'; 
    let prizeClasses = []; 
    
    if ((0 <= props.angle && props.angle < 187.2) || props.angle === 360) { //not going to hit 360, but just in case
        rarityType = 'common';
        rarityColor = 'brown'; 
    } 
    else if (187.2 <= props.angle && props.angle < 259.2) {
        rarityType = 'uncommon'; 
        rarityColor = 'cyan'; 
        article = 'an'; 
    }
    else if (259.2 <= props.angle && props.angle < 313.2) {
        rarityType = 'rare'; 
        rarityColor = 'red'; 
    }
    else if (313.2 <= props.angle && props.angle < 349.2) {
        rarityType = 'epic'; 
        rarityColor = 'purple'; 
        article = 'an'; 
    }
    else if (349.2 <= props.angle && props.angle < 356.4) {
        rarityType = 'holy'; 
        rarityColor = 'orange'; 
    }
    else if (356.4 <= props.angle && props.angle < 359.964) {
        rarityType = 'godly'; 
        rarityColor = 'yellow'; 
    }
    else if (359.964 <= props.angle && props.angle < 360) {
        rarityType = '???'; 
        prizeClasses.push(classes.Rainbow); 
    } 

    return (
        <Modal show clicked={props.clicked} animation="openPrize">
            <div className={classes.Text}>
                You unboxed {article} <strong style={{color: rarityColor}} className={prizeClasses.join(' ')}>{rarityType}</strong> item! 
            </div>
        </Modal>  
    )
}

export default prize; 
