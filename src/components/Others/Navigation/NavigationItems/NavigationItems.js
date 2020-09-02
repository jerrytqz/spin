import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem'; 
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Spin</NavigationItem>
        <NavigationItem link="/inventory">Inventory</NavigationItem>
        <NavigationItem link="/profile">Profile</NavigationItem>
        {props.isAuthenticated 
            ? <NavigationItem link="/logout">Log Out</NavigationItem>
            : <NavigationItem link="/authentication">Log In</NavigationItem>}
    </ul>
)

export default navigationItems; 
