import React, { Component } from 'react'; 
import classes from './Layout.module.css'; 
import Toolbar from '../navigation/Toolbar/Toolbar'; 
import { connect } from 'react-redux'; 

class Layout extends Component {
    render() {
        return (
            <div>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated} 
                    user={this.props.user}
                    sp={this.props.sp}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.authentication.user, 
        isAuthenticated: state.authentication.isAuthenticated,
        sp: state.authentication.sp
    };
};

export default connect(mapStateToProps)(Layout); 
