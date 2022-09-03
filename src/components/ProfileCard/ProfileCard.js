import React from 'react';
import classes from './ProfileCard.module.css';
import logoImg from '../../assets/images/icon.jpeg'; 
import { numberWithCommas } from '../../shared/utility'; 
import { Link } from 'react-router-dom';

const ProfileCard = (props) => (
    <Link to={'/profile/' + props.user} className={classes.ProfileCard}>
        <img src={logoImg} alt="Spin"/>
        <div className={classes.Text}>
            <div className={classes.User}>{props.user}</div>
            <div className={classes.SP}>{numberWithCommas(props.sp)} SP</div>
        </div>
    </Link>
);

export default ProfileCard; 
