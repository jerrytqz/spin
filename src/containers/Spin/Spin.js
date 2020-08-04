import React, {Component} from 'react';
import Prize from '../../components/Spin/Prize/Prize';  
import Spinner from '../../components/Spin/Spinner/Spinner'; 
import SpinInfo from '../../components/Spin/SpinInfo/SpinInfo'; 
import SpinButtons from '../../components/Spin/SpinButtons/SpinButtons'; 

class Spin extends Component {
    state = {
        spinDegree: 0,
        trueDegree: 0,
        startButtonPressed: false,
        resetButtonPressed: true,     
        resetting: false,
        showSpinInfo: false,
    }

    startSpinHandler = () => {
        let spinDegree = 1800 + Math.random()*360; 
        let trueDegree = spinDegree - 1800; 
        this.setState({startButtonPressed: true, spinDegree: spinDegree, trueDegree: trueDegree}); 
        setTimeout(() => this.setState({resetButtonPressed: false}), 700);
    }

    resetSpinHandler = () => { 
        this.setState({resetButtonPressed: true, spinDegree: 0, resetting: true}); 
        setTimeout(() => this.setState({startButtonPressed: false, resetting: false}), 700);
    }

    showSpinInfoHandler = () => {
        this.setState(previous => ({showSpinInfo: !previous.showSpinInfo}));
    }

    render() {
        // console.log('spinDegree: ' + this.state.spinDegree);
        return (
            <div>
                <Spinner 
                    startSpinHandler={this.startSpinHandler}
                    startButtonPressed={this.state.startButtonPressed}
                    spinDegree={this.state.spinDegree}
                    resetting={this.state.resetting}/>
                <SpinButtons 
                    onClickReset={this.resetSpinHandler}
                    onClickInfo={this.showSpinInfoHandler}
                    disabledReset={this.state.resetButtonPressed}/>
                {!this.state.resetButtonPressed ? <Prize angle={this.state.trueDegree} showPrize={!this.state.resetButtonPressed}/> : null}
                {this.state.showSpinInfo ? <SpinInfo/> : null}
            </div>   
        ); 
    }
}

export default Spin;
