import React from 'react';
import spinnerLogo from '../../assets/images/icon.jpeg'; 
import classes from './Logo.module.css';

const logo = (props) => (
    <div className = {classes.Logo}>
        <img src = {spinnerLogo} alt = "Spin"/>
        <h2 className = {classes.text}><strong>Spin</strong></h2>
        <h2 className = {classes.version}>1.0.0</h2>
    </div>
)

export default logo; 