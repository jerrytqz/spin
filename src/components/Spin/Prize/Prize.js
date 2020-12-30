import React from 'react';
import classes from './Prize.module.css'; 
import Modal from '../../../shared/UI/Modal/Modal'; 
import { mapRarityToColor } from '../../../shared/utility'; 
import Item from '../../Inventory/Item/Item'; 

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
                    <div className={classes.Description}>{props.item.description}</div>
                    <div className={classes.Stats}>
                        <div className={classes.Stat}>Owned: {props.item.quantity}</div>
                        <div className={classes.Stat}>In circulation: {props.item.circulationNum}</div>
                    </div>
                </div>
                <div>
                    <Item 
                        name={props.item.name} 
                        quantity={1} 
                        rarity={props.item.rarity} 
                        disableHover
                        disableSpin
                    />
                </div>
            </div>
        </Modal>  
    );
};

export default prize; 
