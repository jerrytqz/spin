import React from 'react';
import classes from './SP.module.css';
import Backdrop from '../../shared/userInterfaces/Backdrop/Backdrop';
import Modal from '../../shared/userInterfaces/Modal/Modal'; 
import LoadingSpinner from '../../shared/userInterfaces/LoadingSpinner/LoadingSpinner';
import { numberWithCommas, dhms } from '../../shared/utility'; 
 
const SP = (props) => {
    let freeSPError = props.getFreeSPError; 
    if (typeof(freeSPError) === 'number') {
        freeSPError = `Next free SP in ${dhms(freeSPError, false)}`; 
    }

    let freeSPClasses = [classes.FreeSPButton, classes.Plus];
    if (props.disabledFreeSP) freeSPClasses.push(classes.FreeSPButtonDisabled);

    return (
        <>
            <div className={classes.SP}>
                <strong className={classes.SPText}>{numberWithCommas(props.sp)} SP</strong>
                {props.getFreeSPLoading 
                    ? <LoadingSpinner style={{margin: '0 0 0 7px', fontSize: '1.5px'}}/>
                    : <div className={freeSPClasses.join(' ')} onClick={props.onClickFreeSP}></div>
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
