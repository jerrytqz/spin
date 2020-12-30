import React from 'react'; 
import classes from './Showcase.module.css';
import Item from '../../Item/Item'; 

const showcase = (props) => {
    const one = props.showcaseItems.one; 
    const two = props.showcaseItems.two; 
    const three = props.showcaseItems.three; 

    return (
        <div className={classes.Showcase}>
            {one !== 'nothing' 
                ? 
                    <Item 
                        rarity={one.rarity} 
                        quantity={one.quantity} 
                        name={one.name} 
                        showcase
                        disableHover
                    /> 
                : <Item nullItem showcase/>
            }
            {two !== 'nothing' 
                ? 
                    <Item 
                        rarity={two.rarity} 
                        quantity={two.quantity} 
                        name={two.name} 
                        showcase
                        disableHover
                    /> 
                : <Item nullItem showcase/>
            } 
            {three !== 'nothing' 
                ? 
                    <Item 
                        rarity={three.rarity} 
                        quantity={three.quantity} 
                        name={three.name} 
                        showcase
                        disableHover
                    /> 
                : <Item nullItem showcase/>
            }
        </div>
    );
};

export default showcase;
