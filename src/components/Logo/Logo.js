import React from 'react';
import logoImg from '../../assets/images/icon.jpeg'; 
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={logoImg} alt="Spin"/>
        <div className={classes.Text}>
            <div className={classes.Name}>Spin</div>
            <div className={classes.Version}>1.0.0</div>
        </div>
    </div>
);

export default logo; 
