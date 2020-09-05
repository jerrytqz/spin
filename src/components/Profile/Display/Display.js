import React from 'react'; 
import classes from './Display.module.css';
import Showcase from './Showcase/Showcase'; 

const display = (props) => {
    return (
        <div className={classes.Display}>
            <Showcase showcaseItems={props.showcaseItems}/>
        </div>
    )
}

export default display; 
