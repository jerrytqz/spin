import React from 'react';
import classes from './BuyForm.module.css'; 
import Backdrop from '../../../shared/UI/Backdrop/Backdrop';
import Item from '../../Inventory/Item/Item';
import YesNoButton from '../../../shared/UI/Buttons/YesNoButton/YesNoButton';
import {dhm, numberWithCommas} from '../../../shared/utility'; 
import LoadingSpinner from '../../../shared/UI/LoadingSpinner/LoadingSpinner'; 

const buyForm = (props) => {

	let buttonText = 'Log in to buy';
	let ownItem = props.user === props.seller;
	if (props.isAuthenticated) {
		buttonText = 'Buy';
		if (ownItem) {
			buttonText = 'Cannot buy own item'; 
		}
	}

	return (
		<div> 
			<Backdrop show={props.show} clicked={props.clicked} opacity="0.5"/>
			{
				props.show 
					?
					<div className={classes.BuyForm}>
						{
							!props.loading 
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
											<div style={{fontWeight: 'bold', fontSize: '1.25em'}}>{props.seller}</div>
											<div style={{marginTop: '16px'}}>{numberWithCommas(props.price)} SP</div>
											<div style={{fontSize: '0.65em', fontStyle: 'italic', marginTop: '16px', color: '#616161'}}>{dhm(new Date().getTime() - props.listTime)}</div>
											{props.error ? <div style={{color: 'red', textAlign: 'center', marginTop: '42px'}}>{props.error}</div> : null}
										</div>
										<YesNoButton 
											btnType="Yes" 
											onClick={props.onClickBuy} 
											disabled={!props.isAuthenticated || ownItem}
											style={{margin: '0'}}
										>
											{buttonText}
										</YesNoButton>            
									</div>
								</>
								: <LoadingSpinner/>
						}
					</div> 
					: null
			} 
		</div>
	);
};

export default buyForm; 
