import React from 'react';
import classes from './Prize.module.css'; 
import Modal from '../../../shared/UI/Modal/Modal'; 
import {mapRarityToColor} from '../../../shared/Functions/utility'; 
import Item from '../../Inventory/Item/Item'; 

// Rarity is calculated on backend, this is just so that not as much info has to be sent from the backend to the frontend
const prize = (props) => {
    let rarityType = null;
    let article = 'a'; 
    let prizeClasses = []; 
    
    if (0 <= props.degree && props.degree < 187.2) { 
        rarityType = 'Common';
    } 
    if (187.2 <= props.degree && props.degree < 259.2) {
        rarityType = 'Uncommon'; 
        article = 'an'; 
    }
    if (259.2 <= props.degree && props.degree < 313.2) {
        rarityType = 'Rare'; 
    }
    if (313.2 <= props.degree && props.degree < 349.2) {
        rarityType = 'Epic'; 
        article = 'an'; 
    }
    if (349.2 <= props.degree && props.degree < 358.2) {
        rarityType = 'Holy'; 
    }
    if (358.2 <= props.degree && props.degree < 359.964) {
        rarityType = 'Godly'; 
    }
    if (359.964 <= props.degree && props.degree < 360) {
        rarityType = '???'; 
        prizeClasses.push(classes.Rainbow); 
    } 

    return (
        <Modal show clicked={props.clicked} animation="openPrize">
            <div className={classes.Prize}>
                <div className={classes.Info}>
                    You unboxed {article} <strong style={{color: mapRarityToColor(rarityType)}} className={prizeClasses.join(' ')}>{rarityType.toLowerCase()}</strong> item! 
                    <hr/>
                </div>
                <div className={classes.Item}>
                    <Item name={props.item.name} quantity={1} rarity={props.item.rarity}/>
                </div>
            </div>
        </Modal>  
    )
}

export default prize; 
