import React from 'react';
import classes from './BuyForm.module.css'; 
import Item from '../Item/Item';
import YesNoButton from '../../shared/userInterfaces/buttons/YesNoButton/YesNoButton';
import { dhms, numberWithCommas } from '../../shared/utility'; 
import LoadingSpinner from '../../shared/userInterfaces/LoadingSpinner/LoadingSpinner'; 
import Modal from '../../shared/userInterfaces/Modal/Modal'; 

const BuyForm = (props) => {
    let buttonText = 'Log in to buy';
    let disabled = props.user === props.seller || (props.sp < props.price && props.isAuthenticated); 

    if (props.isAuthenticated) {
        buttonText = 'Buy';
        if (props.sp < props.price) {
            buttonText = 'Not enough SP'; 
        }
        if (props.user === props.seller) {
            buttonText = 'Cannot buy own item'; 
        }
    }

    return (props.show 
        ? 
            <Modal 
                show={props.show} 
                clicked={props.backdropClicked} 
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
                                    <div className={classes.ListTime}>{"Listed " + dhms(new Date().getTime() - props.listTime, true) + " ago"}</div>
                                    {props.error ? <div className={classes.Error}>{props.error}</div> : null}
                                </div>
                                <YesNoButton 
                                    btnType="Yes" 
                                    onClick={props.isAuthenticated ? props.submitHandler : props.onClickUnauthorizedBuy} 
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
        : null
    );
};

export default BuyForm; 
