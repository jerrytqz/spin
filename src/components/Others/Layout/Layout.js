import React, {Component} from 'react'; 
import classes from './Layout.module.css'; 
import Toolbar from '../Navigation/Toolbar/Toolbar'; 
import {connect} from 'react-redux'; 

class Layout extends Component {
    render() {
        return (
            <div>
                <Toolbar isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    }
}

export default connect(mapStateToProps)(Layout); 
