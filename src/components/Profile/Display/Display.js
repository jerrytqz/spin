import React from 'react'; 
import classes from './Display.module.css';
import Showcase from './Showcase/Showcase'; 
import Graph from './Graph/Graph'; 

const display = (props) => {
    return (
        <div className={classes.Display}>
            <Showcase showcaseItems={props.showcaseItems}/>
            <hr className={classes.Separator}/>
            <Graph rarityStats={props.rarityStats} totalSpins={props.totalSpins}/>
        </div>
    )
}

export default display; 
