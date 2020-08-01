import React, {Component} from 'react';
import Prize from '../../components/Spin/Prize/Prize';  
import Spinner from '../../components/Spin/Spinner/Spinner'; 
import SpinInfo from '../../components/Spin/Info/SpinInfo'; 
import SpinButtons from '../../components/Spin/Buttons/SpinButtons'; 

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
        return (
            <div>
                <Spinner 
                    startSpin={this.startSpin}
                    spinNeedsReset={this.state.spinNeedsReset}
                    startButtonPressed={this.state.startButtonPressed}
                    spinDegree={this.state.spinDegree}/>
                <SpinButtons 
                    onClickReset={this.resetSpin}
                    onClickInfo={this.showSpinInfoHandler}
                    disabled={!this.state.spinNeedsReset || this.state.resetButtonPressed}/>
                {this.state.spinEnded ? <Prize angle={this.state.realDegree} showPrize={this.state.spinEnded}/> : null}
                {this.state.showSpinInfo ? <SpinInfo/> : null}
            </div>   
        ); 
    }
}

export default Spin;
