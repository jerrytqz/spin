import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem'; 
import classes from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Spin</NavigationItem>
        <NavigationItem link="/">Collection</NavigationItem>
        <NavigationItem link="/">Profile</NavigationItem>
        <NavigationItem link="/">Log In</NavigationItem>
    </ul>
)

export default navigationItems; 
