import React from 'react';
import classes from './ErrorPage.module.css';

const ErrorPage = () => (
    <>
        <div className={classes.ErrorTitle}>
            404
        </div>
        <div className={classes.ErrorDescription}>
            Page not found!
        </div>
    </>
);

export default ErrorPage; 
