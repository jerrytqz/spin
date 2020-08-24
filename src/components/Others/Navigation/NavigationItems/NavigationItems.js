import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem'; 
import classes from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Spin</NavigationItem>
        <NavigationItem link="/collection">Collection</NavigationItem>
        <NavigationItem link="/profile">Profile</NavigationItem>
        <NavigationItem link="/authentication">Log In</NavigationItem>
    </ul>
)

export default navigationItems; 
