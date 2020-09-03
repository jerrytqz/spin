import React, {Component} from 'react'; 
import classes from './Inventory.module.css'; 
import Item from '../../components/Inventory/Item/Item'; 
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import {mapRarityToValue} from '../../shared/Functions/utility'; 

class Inventory extends Component {
    componentDidMount() {
        if (this.props.autoLogInAttemptFinished) {
            this.props.onFetchInventory(this.props.token); 
        }
    }
    
    render() {
        let inventory = []; 
        if (this.props.inventory) {
            const rawInventory = Object.entries(this.props.inventory);
            for (const [item, info] of rawInventory) {
                inventory.push(<Item 
                    key={info.id} 
                    name={item} 
                    quantity={info.quantity}
                    rarity={info.rarity}/>)
            }
            inventory.sort((a, b) => mapRarityToValue(a.props.rarity) - mapRarityToValue(b.props.rarity));
            inventory.reverse(); 
        }
        return (this.props.fetchInventoryLoading ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> :
            this.props.fetchError ? <div className={classes.FetchErrorMessage}>{this.props.fetchError}</div> :
            <div className={classes.Inventory}>
                {inventory}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        inventory: state.inventory.inventory,
        fetchInventoryLoading: state.inventory.fetchInventoryLoading,
        fetchError: state.inventory.fetchError,
        autoLogInAttemptFinished: state.authentication.autoLogInAttemptFinished
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchInventory: (token) => dispatch(actions.fetchInventory(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
