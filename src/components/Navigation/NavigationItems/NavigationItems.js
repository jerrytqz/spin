import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem'; 
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
    let profileLink = `/profile/${props.user}`; 
    if (!props.user) {
        profileLink = '/profile';       
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Spin</NavigationItem>
            <NavigationItem link="/market">Market</NavigationItem>
            <NavigationItem link="/inventory">Inventory</NavigationItem>
            <NavigationItem 
                link={profileLink} 
                isActive={(match, location) => location['pathname'].includes('/profile')}
            >
                Profile
            </NavigationItem>
            {props.isAuthenticated 
                ? <NavigationItem link="/log-out">Log Out</NavigationItem>
                : <NavigationItem link="/authentication">Log In</NavigationItem>
            }
        </ul>
    );
};

export default NavigationItems; 
