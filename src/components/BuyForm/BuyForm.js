import React from 'react';
import classes from './BuyForm.module.css'; 
import Item from '../Item/Item';
import YesNoButton from '../../shared/UI/Buttons/YesNoButton/YesNoButton';
import { dhm, numberWithCommas } from '../../shared/utility'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner'; 
import Modal from '../../shared/UI/Modal/Modal'; 

const BuyForm = (props) => {
    let buttonText = 'Log in to buy';
    let disabled = !props.isAuthenticated || props.user === props.seller || props.sp < props.price; 

    if (props.isAuthenticated) {
        buttonText = 'Buy';
        if (props.sp < props.price) {
            buttonText = 'Not enough SP'; 
        }
        if (props.user === props.seller) {
            buttonText = 'Cannot buy own item'; 
        }
    }

    return (
        <Modal 
            show={props.show} 
            clicked={props.clicked} 
            style={{borderRadius: '0', display: 'flex'}}
            backdropStyle={{opacity: '0.5'}}
        >
            {!props.loading 
                ? 
                    <>
                        <div>
                            <Item
                                name={props.name}
                                rarity={props.rarity}
                                quantity={1}
                                showcase
                                disableHover
                                disableSpin
                            />
                        </div>
                        <div className={classes.Right}>
                            <div>
                                <div className={classes.Seller}>{props.seller}</div>
                                <div style={{marginTop: '16px'}}>{numberWithCommas(props.price)} SP</div>
                                <div className={classes.ListTime}>{dhm(new Date().getTime() - props.listTime)}</div>
                                {props.error ? <div className={classes.Error}>{props.error}</div> : null}
                            </div>
                            <YesNoButton 
                                btnType="Yes" 
                                onClick={props.submitHandler} 
                                disabled={disabled}
                                style={{margin: '0'}}
                            >
                                {buttonText}
                            </YesNoButton>            
                        </div>
                    </>
                : <LoadingSpinner/>
            }
        </Modal> 
    );
};

export default BuyForm; 
