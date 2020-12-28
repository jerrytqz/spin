import React, {Component} from 'react'; 
import classes from './Inventory.module.css'; 
import Item from '../../components/Inventory/Item/Item'; 
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import {mapRarityToValue} from '../../shared/utility'; 
import {updateObject, checkValidity} from '../../shared/utility';
import SellForm from '../../components/Inventory/SellForm/SellForm'; 
import Input from '../../shared/UI/Input/Input'; 
import YesNoButton from '../../shared/UI/Buttons/YesNoButton/YesNoButton';

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
                    maxValue: 10000000,
                    isNumber: true 
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false, 
        showSellForm: false,
        currentItemID: '',
        currentItemName: ''
    }

    componentDidMount() {
        this.props.onFetchInventory(this.props.token); 
    }
    
    inventoryItemClickedHandler = (itemID, itemName) => {
        this.setState({showSellForm: true, currentItemID: itemID, currentItemName: itemName}); 
    }

    backdropClickedHandler = () => {
        this.setState(prev => ({
            ...prev,
            controls: {
                ...prev.controls,
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
            showSellForm: false,
        })); 
        this.props.onClearListError(); 
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })   
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid; 
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    submitHandler = async() => {
        await this.props.onListItem(this.props.token, this.state.controls.price.value, this.state.currentItemID);
        if (this.props.listError === null) {
            this.backdropClickedHandler(); 
        }
    }
    
    render() {
        let inventory = []; 
        if (this.props.inventory) {
            const rawInventory = Object.entries(this.props.inventory);
            for (const [item, info] of rawInventory) {
                inventory.push(<Item 
                    key={info.inventoryID} 
                    name={item} 
                    quantity={info.quantity} 
                    rarity={info.rarity} 
                    onClick={() => this.inventoryItemClickedHandler(info.itemID, item)}
                />)
            }
            inventory.sort((a, b) => -(mapRarityToValue(a.props.rarity) - mapRarityToValue(b.props.rarity)));
        }

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
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
        ))

        return (this.props.fetchInventoryLoading ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> :
            this.props.fetchError ? <div className={classes.FetchErrorMessage}>{this.props.fetchError}</div> :
            inventory.length !== 0 ? 
            <>
                <div className={classes.Inventory}>
                    {inventory}
                </div> 
                <SellForm show={this.state.showSellForm} clicked={this.backdropClickedHandler}>
                    <div style={{textAlign: "center", fontSize: "1.4em"}}>{this.state.currentItemName}</div>
                    {form}
                    <YesNoButton 
                        btnType="Yes" 
                        disabled={!this.state.formIsValid}
                        onClick={this.submitHandler}
                    >
                        List
                    </YesNoButton>
                    <div style={{textAlign: "center", color: "red"}}>{this.props.listError}</div>
                </SellForm>
            </>
            :
            <div className={classes.InventoryNullText}>
                Nothing to show! 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        token: state.authentication.token,
        inventory: state.inventory.inventory,
        fetchInventoryLoading: state.inventory.fetchInventoryLoading,
        fetchError: state.inventory.fetchError,
        listItemLoading: state.inventory.listItemLoading,
        listError: state.inventory.listError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchInventory: (token) => dispatch(actions.fetchInventory(token)),
        onListItem: (token, price, itemID) => dispatch(actions.listItem(token, price, itemID)),
        onClearListError: () => dispatch(actions.clearListError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
