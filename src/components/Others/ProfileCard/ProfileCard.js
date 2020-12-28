import React from 'react';
import classes from './ProfileCard.module.css';

const profileCard = (props) => (
    <div className={classes.ProfileCard}>
        <div className={classes.Username}>{props.username}</div>
        <div className={classes.SP}>{props.SP} SP</div>
    </div>
)

export default profileCard; 
