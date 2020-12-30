import React from 'react'; 
import classes from './Display.module.css';
import Showcase from './Showcase/Showcase'; 
import PieChart from './PieChart/PieChart'; 

const display = (props) => {
    return (
        <div className={classes.Display}>
            <Showcase showcaseItems={props.showcaseItems}/>
            <hr className={classes.Separator}/>
            <PieChart rarityStats={props.rarityStats} totalSpins={props.totalSpins}/>
        </div>
    );
};

export default display; 
