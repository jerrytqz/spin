import React, {Component} from 'react';
import Prize from '../../components/Spin/Prize/Prize';  
import Spinner from '../../components/Spin/Spinner/Spinner'; 
import SpinInfo from '../../components/Spin/SpinInfo/SpinInfo'; 
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index'; 

class Spin extends Component {
    state = {
        spinDegree: 0,
        trueDegree: 0,
        startButtonPressed: false, 
        resetting: false,
        showPrize: false 
    }

    startSpinHandler = () => {
        this.props.onPurchaseSpin(this.props.token); 
        let spinDegree = 1800 + Math.random()*360; 
        let trueDegree = spinDegree - 1800; 
        this.setState({startButtonPressed: true, spinDegree: spinDegree, trueDegree: trueDegree}); 
        setTimeout(() => this.setState({showPrize: true}), 700);
    }

    resetSpinHandler = () => { 
        this.setState({spinDegree: 0, resetting: true, showPrize: false}); 
        setTimeout(() => this.setState({startButtonPressed: false, resetting: false}), 700);
    }

    render() {
        // console.log(this.props.SP);
        // console.log(this.props.token); 
        // console.log('spinDegree: ' + this.state.spinDegree);
        return (
            <div>
                <Spinner 
                    startSpinHandler={this.startSpinHandler}
                    startButtonPressed={this.state.startButtonPressed}
                    spinDegree={this.state.spinDegree}
                    resetting={this.state.resetting}/>
                {this.state.showPrize ? <Prize angle={this.state.trueDegree} clicked={this.resetSpinHandler}/> : null}
                <SpinInfo/>
            </div>   
        ); 
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        SP: state.spin.SP
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseSpin: (token) => dispatch(actions.purchaseSpin(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spin);
