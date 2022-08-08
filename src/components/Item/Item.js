import React from 'react';
import classes from './Item.module.css';
import { RARITY_INFO } from '../../shared/utility'; 

const Item = (props) => {
    // Item names are converted to their corresponding image path names by changing every
    // letter to lowercase and replacing spaces with '-'
    let imagePathName = ''; 
    let imagePath = '';
    if (props.name) {
        imagePathName = props.name.replace(/\s+/g, '-').toLowerCase(); 
        try {
            imagePath = require(`../../assets/images/items/${imagePathName}.jpeg`); 
        } catch (e) {
            console.log(props.name + "'s image is not currently available."); 
        }
    }

    const color = !props.nullItem ? RARITY_INFO[props.rarity][0] : null; 
    const itemClasses = [classes.Item]; 
    const itemNameClasses = [classes.ItemName];  

    if (color === 'rainbow') {
        itemClasses.push(classes.ItemRainbow); 
        itemNameClasses.push(classes.ItemNameRainbow); 
    }

    if (props.showcase) {
        itemClasses.push(classes.ItemShowcase);
    }

    if (props.disableHover) {
        itemClasses.push(classes.DisableHover); 
    }

    if (props.disableSpin) {
        itemClasses.push(classes.DisableSpin);
    }

    if (props.disableSpin && color === 'rainbow') {
        itemClasses.push(classes.DisableSpinRainbow);
        itemNameClasses.push(classes.DisableSpinRainbowName); 
    }

    return (!props.nullItem ? 
        <div className={itemClasses.join(' ')} style={{borderColor: color}} onClick={props.onClick}>
            <div className={itemNameClasses.join(' ')} style={{color: color}}>{props.name}</div>
            <img src={imagePath} className={classes.ItemImage} alt={props.name}/>
            {props.quantity ? <div className={classes.ItemBottomText}>x{props.quantity}</div> : null}
            {props.price ? <div className={classes.ItemBottomText}>{props.price} SP</div> : null} 
        </div> : 
        <div className={itemClasses.join(' ')} style={{animation: 'none', pointerEvents: 'none'}}>
            <div className={classes.ItemName}/>
            <div className={classes.ItemNullText}>Nothing to show!</div>
            <div className={classes.ItemQuantity}/>
        </div>
    );
};

export default Item; 
