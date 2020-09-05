import React, {Component} from 'react'; 
import classes from './Profile.module.css'; 
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import Stats from '../../components/Profile/Stats/Stats'; 
import Display from '../../components/Profile/Display/Display'; 

class Profile extends Component {
    componentDidMount() {
        if (this.props.autoLogInAttemptFinished) {
            this.props.onFetchProfile(this.props.token); 
        }
    }
    
    render() {
        let profile = null; 
        if (this.props.profile) {
            profile = (
                <div className={classes.Profile}>
                    <div className={classes.Header}>{this.props.profile.username}</div>
                    <div className={classes.Body}>
                        <Stats stats={this.props.profile.stats}/>
                        <Display showcaseItems={this.props.profile.showcaseItems}/>
                    </div>
                </div>
            )
        }

        return (this.props.fetchProfileLoading ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> : 
            this.props.fetchError ?  <div className={classes.FetchErrorMessage}>{this.props.fetchError}</div> :
            profile
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        profile: state.profile.profile,
        fetchProfileLoading: state.profile.fetchProfileLoading,
        fetchError: state.profile.fetchError,
        autoLogInAttemptFinished: state.authentication.autoLogInAttemptFinished
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: (token) => dispatch(actions.fetchProfile(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 
