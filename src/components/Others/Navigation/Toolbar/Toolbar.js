import React from 'react';
import classes from './Toolbar.module.css'; 
import NavigationItems from '../NavigationItems/NavigationItems'; 
import Logo from '../../Logo/Logo'; 
import ProfileCard from '../../ProfileCard/ProfileCard'; 

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		{props.isAuthenticated ? <ProfileCard username={props.username} SP={props.SP}/> : <Logo/>}
		<nav>
			<NavigationItems isAuthenticated={props.isAuthenticated} username={props.username}/>
		</nav>
	</header>
);

export default toolbar; 
