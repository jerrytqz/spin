import React from 'react';
import classes from './Toolbar.module.css'; 
import NavigationItems from '../NavigationItems/NavigationItems'; 
import Logo from '../../Logo/Logo'; 

const toolbar = () => (
    <header className={classes.Toolbar}>
        <Logo/> 
        <nav>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar; 
