import React, { Component } from 'react'; 
import classes from './Inventory.module.css'; 
import Item from '../../components/Item/Item'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import { MAX_LIST_PRICE, LIST_PRICE_PER_FEE, RARITY_INFO, updateObject, checkValidity, numberWithCommas } from '../../shared/utility';
import ListForm from '../../components/ListForm/ListForm'; 
import Input from '../../shared/UI/Input/Input'; 

class Inventory extends Component {
    state = {
        controls: {
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Price'
                },
                value: '',
                validation: {
                    required: true,
                    minValue: 1,
                    maxValue: MAX_LIST_PRICE,
                    isNumber: true 
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false, 
        showListForm: false,
        currentInventoryID: 0,
        currentItemName: ''
    }

    componentDidMount() {
        this.props.onFetchInventory(this.props.token); 
    }
    
    inventoryItemClickedHandler = (inventoryID, itemName) => {
        this.setState({showListForm: true, currentInventoryID: inventoryID, currentItemName: itemName}); 
    }

    backdropClickedHandler = () => {
        if (!this.props.listItemLoading) {
            this.setState(prev => ({
                ...prev,
                controls: {
                    price: {
                        ...prev.controls.price,
                        ...prev.controls.price.elementConfig,
                        value: '',
                        ...prev.controls.price.validation,
                        valid: false,
                        touched: false
                    }
                },
                formIsValid: false, 
                showListForm: false,
            })); 
            this.props.onResetListItemError(); 
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });   
        let formIsValid = true;
        for (const inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid; 
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    submitHandler = async () => {
        const price = this.state.controls.price.value; 
        await this.props.onListItem(this.props.token, this.state.controls.price.value, this.state.currentInventoryID);
        if (this.props.listItemError === null) {
            this.backdropClickedHandler(); 
            this.props.onChangeSP(-Math.floor(Number(price)/LIST_PRICE_PER_FEE));
        }
    }
    
    render() {
        const inventory = []; 
        if (this.props.inventory) {
            const rawInventory = Object.entries(this.props.inventory);
            for (const [itemName, info] of rawInventory) {
                inventory.push(
                    <Item 
                        key={info.inventoryID} 
                        name={itemName} 
                        quantity={info.quantity} 
                        rarity={info.rarity} 
                        onClick={() => this.inventoryItemClickedHandler(info.inventoryID, itemName)}
                    />
                );
            }
            inventory.sort((a, b) => -(RARITY_INFO[a.props.rarity][1] - RARITY_INFO[b.props.rarity][1]));
        }

        const formElementsArray = [];
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const inputs = formElementsArray.map(formElement => (
            <Input
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value} 
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                valueType = {formElement.config.elementConfig.placeholder}
            />
        ));

        const tax = Math.floor(Number(this.state.controls.price.value)/LIST_PRICE_PER_FEE); 
        let buttonText = `List (-${numberWithCommas(tax)} SP)`;
        let disabled = false; 

        if (this.props.sp < tax) {
            buttonText = 'Not enough SP to list'; 
            disabled = true; 
        }

        if (!this.state.formIsValid) {
            buttonText = 'Max list price is 10,000,000 SP';
            disabled = true; 
        }
                       
        return (
            this.props.fetchInventoryLoading 
                ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> 
                : this.props.fetchInventoryError 
                    ? <div className={classes.FetchError}>{this.props.fetchInventoryError}</div> 
                    : inventory.length !== 0 
                        ? 
                            <div className={classes.Inventory}>
                                {inventory}
                                <ListForm 
                                    show={this.state.showListForm} 
                                    backdropClicked={this.backdropClickedHandler}
                                    name={this.state.currentItemName}
                                    disabled={disabled}
                                    submitHandler={this.submitHandler}
                                    error={this.props.listItemError}
                                    buttonText={buttonText}
                                    loading={this.props.listItemLoading}
                                >
                                    {inputs}
                                </ListForm>
                            </div> 
                        :
                            <div className={classes.InventoryNullText}>
                                Nothing to show! 
                            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        token: state.authentication.token,
        sp: state.authentication.sp, 
        inventory: state.inventory.inventory,
        fetchInventoryLoading: state.inventory.fetchInventoryLoading,
        fetchInventoryError: state.inventory.fetchInventoryError,
        listItemLoading: state.inventory.listItemLoading,
        listItemError: state.inventory.listItemError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchInventory: (token) => dispatch(actions.fetchInventory(token)),
        onListItem: (token, price, inventoryID) => dispatch(actions.listItem(token, price, inventoryID)),
        onResetListItemError: () => dispatch(actions.resetListItemError()),
        onChangeSP: (changeAmount) => dispatch(actions.changeSP(changeAmount))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
