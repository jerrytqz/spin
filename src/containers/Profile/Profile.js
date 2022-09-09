import React, { Component } from 'react'; 
import classes from './Profile.module.css'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import ProfileStats from '../../components/ProfileStats/ProfileStats'; 
import ProfileDisplay from '../../components/ProfileDisplay/ProfileDisplay'; 

class Profile extends Component {
    componentDidMount() {
        this.props.onFetchProfile(this.props.match.params.username); 
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.props.onFetchProfile(this.props.match.params.username);
        }
    }
    
    render() {
        let profile = null; 
        if (this.props.profile) {
            profile = (
                <div className={classes.Profile}>
                    <div className={classes.Header}>{this.props.profile.username}</div>
                    <div className={classes.Body}>
                        <ProfileStats stats={this.props.profile.stats}/>
                        <ProfileDisplay 
                            showcaseItems={this.props.profile.showcaseItems} 
                            rarityStats={this.props.profile.stats.rarityStats}
                            totalSpins={this.props.profile.stats.totalSpins}
                        />
                    </div>
                </div>
            );
        } 

        return (
            this.props.fetchProfileLoading 
                ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> 
                : this.props.fetchProfileError 
                    ? <div className={classes.FetchError}>{this.props.fetchProfileError}</div> 
                    : profile
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        fetchProfileLoading: state.profile.fetchProfileLoading,
        fetchProfileError: state.profile.fetchProfileError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProfile: (username) => dispatch(actions.fetchProfile(username))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 
