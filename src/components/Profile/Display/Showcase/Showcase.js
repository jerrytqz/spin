import React from 'react'; 
import classes from './Showcase.module.css';
import Item from '../../../Inventory/Item/Item'; 

const showcase = (props) => {
    const first = props.showcaseItems.first; 
    const second = props.showcaseItems.second; 
    const third = props.showcaseItems.third; 

    return (
        <div className={classes.Showcase}>
            <Item rarity={first.rarity} quantity={first.quantity} name={first.name} showcase/>
            <Item rarity={second.rarity} quantity={second.quantity} name={second.name} showcase/>
            <Item rarity={third.rarity} quantity={third.quantity} name={third.name} showcase/>
        </div>
    )
}

export default showcase