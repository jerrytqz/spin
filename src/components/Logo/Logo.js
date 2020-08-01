import React from 'react';
import spinnerLogo from '../../assets/images/icon.jpeg'; 
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={spinnerLogo} alt="Spin"/>
        <h2 className={classes.Text}><strong>Spin</strong><div className={classes.Version}>1.0.0</div></h2>
    </div>
)

export default logo; 