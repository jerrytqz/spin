import React from 'react';
import classes from './Toolbar.module.css'; 
import NavigationItems from '../NavigationItems/NavigationItems'; 
import Logo from '../../Logo/Logo'; 
import ProfileCard from '../../ProfileCard/ProfileCard'; 

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        {props.isAuthenticated ? <ProfileCard user={props.user} sp={props.sp}/> : <Logo/>}
        <nav>
            <NavigationItems isAuthenticated={props.isAuthenticated} user={props.user}/>
        </nav>
    </header>
);

export default Toolbar; 
