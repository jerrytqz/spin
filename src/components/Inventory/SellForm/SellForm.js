import React from 'react';
import YesNoButton from '../../../shared/UI/Buttons/YesNoButton/YesNoButton'; 
import LoadingSpinner from '../../../shared/UI/LoadingSpinner/LoadingSpinner'; 
import Modal from '../../../shared/UI/Modal/Modal'; 

const sellForm = (props) => (
	<Modal 
		style={{borderRadius: '0'}} 
		show={props.show} 
		clicked={props.clicked} 
		backdropStyle={{opacity: '0.5'}}
	>
		{!props.listItemLoading 
			? 
				<>
					<div style={{textAlign: 'center', fontSize: '1.4em', marginBottom: '20px'}}>{props.currentItemName}</div>
					{props.children}
					<YesNoButton 
						btnType="Yes" 
						disabled={!props.formIsValid}
						onClick={props.submitHandler}
					>
						{props.buttonText}
					</YesNoButton>
					<div style={{textAlign: 'center', color: 'red'}}>{props.listError}</div> 
				</>
			: <LoadingSpinner/>
		}
	</Modal> 
);

export default sellForm; 
