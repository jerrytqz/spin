import React from 'react';
import classes from './ProfileCard.module.css';
import { ASSETS_BASE_DIR, numberWithCommas } from '../../shared/utility'; 
import { Link } from 'react-router-dom';

const ProfileCard = (props) => (
    <div>
        <Link to={'/profile/' + props.user} className={classes.ProfileCard}>
            <img src={`${ASSETS_BASE_DIR}/icon.jpeg`} alt="Spin" draggable={false}/>
            <div className={classes.Text}>
                <div className={classes.User}>{props.user}</div>
                <div className={classes.SP}>{numberWithCommas(props.sp)} SP</div>
            </div>
        </Link>
    </div>
);

export default ProfileCard; 
