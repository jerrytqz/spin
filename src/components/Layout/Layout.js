import React, { Component } from 'react'; 
import classes from './Layout.module.css'; 
import Toolbar from '../Navigation/Toolbar/Toolbar'; 
import { connect } from 'react-redux'; 

class Layout extends Component {
    render() {
        return (
            <div>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated} 
                    username={this.props.username}
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
        username: state.authentication.user, 
        isAuthenticated: state.authentication.isAuthenticated,
        sp: state.authentication.sp
    };
};

export default connect(mapStateToProps)(Layout); 
