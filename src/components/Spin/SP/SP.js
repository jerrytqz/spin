import React from 'react';
import classes from './SP.module.css';
import Modal from '../../../shared/UI/Modal/Modal'; 
import { numberWithCommas } from '../../../shared/utility'; 
 
const SP = (props) => {
    return (
        <>
            <div className={classes.SP}>
                <div>
                    <strong className={classes.SPNumber}>{numberWithCommas(props.SP)}</strong> SP
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
                            {props.freeSPError}
                        </div>
                    </Modal> 
                : null
            }
        </>
    );
};

export default SP; 
