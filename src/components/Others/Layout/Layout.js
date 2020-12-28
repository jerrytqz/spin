import React, {Component} from 'react'; 
import classes from './Layout.module.css'; 
import Toolbar from '../Navigation/Toolbar/Toolbar'; 
import {connect} from 'react-redux'; 

class Layout extends Component {
    render() {
        return (
            <div>
                <Toolbar isAuthenticated={this.props.isAuthenticated} username={this.props.username}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user, 
        isAuthenticated: state.authentication.isAuthenticated
    }
}

export default connect(mapStateToProps)(Layout); 
