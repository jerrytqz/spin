import React from 'react';
import classes from './ProfileCard.module.css';
import logoImg from '../../assets/images/icon.jpeg'; 
import { numberWithCommas } from '../../shared/utility'; 

const profileCard = (props) => (
    <div className={classes.ProfileCard}>
        <img src={logoImg} alt="Spin"/>
        <div className={classes.Text}>
            <div className={classes.User}>{props.user}</div>
            <div className={classes.SP}>{numberWithCommas(props.sp)} SP</div>
        </div>
    </div>
);

export default profileCard; 
