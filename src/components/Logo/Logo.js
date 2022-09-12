import React from 'react';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';
import { ASSETS_BASE_DIR } from '../../shared/utility';

const Logo = () => (
    <div>
        <Link to="/" className={classes.Logo}>
            <img src={`${ASSETS_BASE_DIR}/icon.jpeg`} alt="Spin" draggable={false}/>
            <div className={classes.Text}>
                <div className={classes.Name}>Spin</div>
                <div className={classes.Version}>1.0.0</div>
            </div>
        </Link>
    </div>
);

export default Logo; 
