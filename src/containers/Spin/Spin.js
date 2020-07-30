import React, {Component} from 'react';
import classes from './Spin.module.css';
import Prize from '../../components/Prize/Prize';  
import Spinner from '../../components/Spinner/Spinner'; 
import SpinInfo from '../../components/SpinInfo/SpinInfo'; 

class Spin extends Component {
    state = {
        spinDegree: 0,
        realDegree: -1,
        spinNeedsReset: false,
        startButtonPressed: false,
        resetButtonPressed: false,
        spinEnded: false,
        showSpinInfo: false 
    }

    startSpin = () => {
        this.setState({startButtonPressed: true}); 
        let spinDegree = 1800 + Math.random()*360; 
        let realDegree = spinDegree - 1800; 
        this.setState(previous => ({spinDegree: previous.spinDegree + spinDegree, realDegree: realDegree})); 
        setTimeout(() => this.setState({spinNeedsReset: true, resetButtonPressed: false, spinEnded: true}), 700);
    }

    resetSpin = () => { 
        this.setState({resetButtonPressed: true, spinEnded: false}); 
        this.setState(previous => ({spinDegree: previous.spinDegree - previous.realDegree})); 
        setTimeout(() => this.setState({spinNeedsReset: false, startButtonPressed: false}), 700);
    }

    showSpinInfoHandler = () => {
        this.setState(previous => ({showSpinInfo: !previous.showSpinInfo}));
    }

    render() {
        let spinnerText1 = null; 
        let spinnerText2 = null;
        if (!this.state.startButtonPressed) {
            spinnerText1 = <p className = {classes.spinnerText1}><strong>SPIN</strong></p>
            spinnerText2 = <p className = {classes.spinnerText2}>-500 SP</p>
        }

        return (
            <div>
                <Spinner 
                    startSpin = {this.startSpin}
                    spinNeedsReset = {this.state.spinNeedsReset}
                    startButtonPressed = {this.state.startButtonPressed}
                    spinDegree = {this.state.spinDegree}
                    spinnerText1 = {spinnerText1}
                    spinnerText2 = {spinnerText2}/>
                <button 
                    className = {classes.resetButton}
                    onClick = {this.resetSpin} 
                    disabled = {!this.state.spinNeedsReset || this.state.resetButtonPressed}>Reset
                </button>
                {this.state.spinEnded ? <Prize angle = {this.state.realDegree} showPrize = {this.state.spinEnded}/> : null}
                <button 
                    className = {classes.InfoButton}
                    onClick = {this.showSpinInfoHandler}>?
                </button>
                {this.state.showSpinInfo ? <SpinInfo/> : null}
            </div>   
        ); 
    }
}

export default Spin;