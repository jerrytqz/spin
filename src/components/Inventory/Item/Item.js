import React from 'react';
import classes from './Item.module.css';
import {mapRarityToColor} from '../../../shared/utility'; 

const item = (props) => {
    // let imagePathName = ''; 
    // if (props.name) {
    //     imagePathName = props.name.replace(/\s+/g, '-').toLowerCase(); 
    // }

    const color = mapRarityToColor(props.rarity); 
    let itemClasses = [classes.Item]; 
    let itemNameClasses = [classes.ItemName];  

    if (color === 'rainbow') {
        itemClasses.push(classes.ItemRainbow); 
        itemNameClasses.push(classes.ItemNameRainbow); 
    }

    if (props.showcase) {
        itemClasses.push(classes.ItemShowcase);
    }

    return (!props.nullItem ? 
        <div className={itemClasses.join(' ')} style={{borderColor: color}}>
            <div className={itemNameClasses.join(' ')} style={{color: color}}>{props.name}</div>
            {/* <img src={require(`../../../assets/images/${imagePathName}.jpeg`)} className={classes.ItemImage} alt={props.name}/> */}
            <div className={classes.ItemQuantity}>x{props.quantity}</div>
        </div> : 
        <div className={itemClasses.join(' ')} style={{animation: "none"}}>
            <div className={classes.ItemName}/>
            <div className={classes.ItemNullText}>Nothing to show!</div>
            <div className={classes.ItemQuantity}/>
        </div>
    )
}

export default item; 
