import React from 'react';
import classes from './SP.module.css';
import Backdrop from '../../shared/UI/Backdrop/Backdrop';
import Modal from '../../shared/UI/Modal/Modal'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import { numberWithCommas, dhms } from '../../shared/utility'; 
 
const SP = (props) => {
    let freeSPError = props.getFreeSPError; 
    if (typeof(freeSPError) === 'number') {
        freeSPError = `Next free SP in ${dhms(freeSPError, false)}`; 
    }

    return (
        <>
            <div className={classes.SP}>
                <strong className={classes.SPText}>{numberWithCommas(props.sp)} SP</strong>
                {props.getFreeSPLoading 
                    ? <LoadingSpinner style={{margin: '0 0 0 7px', fontSize: '1.5px'}}/>
                    : <button className={classes.FreeSPButton} onClick={props.onClickFreeSP} disabled={props.disabledFreeSP}>+</button>
                }
            </div>
            {props.getFreeSPLoading
                ? <Backdrop portal style={{opacity: '0'}}/>
                : null
            }
            {props.getFreeSPError 
                ?
                    <Modal clicked={props.onClickBackdrop}>
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
