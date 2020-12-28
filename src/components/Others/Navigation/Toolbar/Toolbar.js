import React from 'react';
import classes from './Toolbar.module.css'; 
import NavigationItems from '../NavigationItems/NavigationItems'; 
import Logo from '../../Logo/Logo'; 

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo/> 
        <nav>
            <NavigationItems isAuthenticated={props.isAuthenticated} username={props.username}/>
        </nav>
    </header>
)

export default toolbar; 
