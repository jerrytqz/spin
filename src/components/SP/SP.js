import React from 'react';
import classes from './SP.module.css';
import Modal from '../../shared/UI/Modal/Modal'; 
import { numberWithCommas, dhm } from '../../shared/utility'; 
 
const SP = (props) => {
    let freeSPError = props.freeSPError; 
    if (typeof(freeSPError) === 'number') {
        freeSPError = `Next free SP in ${dhm(freeSPError).substring(7, dhm(freeSPError).length)}`; 
    }

    return (
        <>
            <div className={classes.SP}>
                <div>
                    <strong className={classes.SPNumber}>{numberWithCommas(props.sp)}</strong> SP
                </div>
                <button 
                    className={classes.FreeSPButton} 
                    onClick={props.onClickFreeSP}
                    disabled={props.disabledFreeSP}
                >
                    +
                </button>
            </div>
            {props.freeSPError
                ? 
                    <Modal show clicked={props.onClickBackdrop}>
                        <div className={classes.FreeSPError}>
                            {freeSPError}
                        </div>
                    </Modal> 
                : null
            }
        </>
    );
};

export default SP; 
