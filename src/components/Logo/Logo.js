import React from 'react';
import logoImg from '../../assets/images/icon.jpeg'; 
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = () => (
    <div>
        <Link to="/" className={classes.Logo}>
            <img src={logoImg} alt="Spin" draggable={false}/>
            <div className={classes.Text}>
                <div className={classes.Name}>Spin</div>
                <div className={classes.Version}>1.0.0</div>
            </div>
        </Link>
    </div>
);

export default Logo; 
