import React from 'react';
import classes from './Item.module.css';

const item = (props) => {

    let itemClasses = [classes.Item]; 
    let itemNameClasses = [classes.ItemName];  
    if (props.color === 'rainbow') {
        itemClasses.push(classes.ItemRainbow); 
        itemNameClasses.push(classes.ItemNameRainbow); 
    }
    
    return (
        <div className={itemClasses.join(' ')} style={{borderColor: props.color}}>
            <div className={itemNameClasses.join(' ')} style={{color: props.color}}>{props.name}</div>
            <div className={classes.ItemImage}>Item Image</div>
            <div className={classes.ItemQuantity}>x{props.quantity}</div>
        </div>
    )
}

export default item; 
