import React from 'react';
import classes from './Item.module.css';
import { ASSETS_BASE_DIR, TQ, RARITY_INFO, mapItemNameToImageName } from '../../shared/utility'; 

const Item = (props) => {
    let imageName = ''; 
    let imagePath = '';
    if (props.name) {
        imageName = mapItemNameToImageName(props.name);
        imagePath = `${ASSETS_BASE_DIR}/items/${imageName}`; 
    }

    const color = !props.nullItem ? RARITY_INFO[props.rarity][0] : null; 
    const itemClasses = [classes.Item]; 
    const itemNameClasses = [classes.ItemName];  

    if (props.rarity === TQ) {
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

    if (props.disableSpin && props.rarity === TQ) {
        itemClasses.push(classes.DisableSpinRainbow);
        itemNameClasses.push(classes.DisableSpinRainbowName); 
    }

    return (!props.nullItem 
        ? 
            <div className={itemClasses.join(' ')} style={{borderColor: color}} onClick={props.onClick}>
                <div className={itemNameClasses.join(' ')} style={{color: color}}>{props.name}</div>
                <img src={imagePath} className={classes.ItemImage} alt={props.name} draggable={false}/>
                {props.quantity ? <div className={classes.ItemBottomText}>x{props.quantity}</div> : null}
                {props.price ? <div className={classes.ItemBottomText}>{props.price} SP</div> : null} 
            </div> 
        : 
            <div className={itemClasses.join(' ')} style={{animation: 'none', pointerEvents: 'none'}}>
                <div className={classes.ItemName}/>
                <div className={classes.ItemNullText}>Nothing to show!</div>
                <div className={classes.ItemQuantity}/>
            </div>
    );
};

export default Item; 
