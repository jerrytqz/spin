import React from 'react'; 
import classes from './ProfileDisplay.module.css';
import Showcase from './Showcase/Showcase'; 
import PieChart from './PieChart/PieChart'; 

const ProfileDisplay = (props) => {
    return (
        <div className={classes.Display}>
            <Showcase showcaseItems={props.showcaseItems}/>
            <hr className={classes.Separator}/>
            <PieChart rarityStats={props.rarityStats} totalSpins={props.totalSpins}/>
        </div>
    );
};

export default ProfileDisplay; 
