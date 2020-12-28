import React, {Component} from 'react'; 
import classes from './Market.module.css'; 
import Item from '../../components/Inventory/Item/Item'; 
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import {mapRarityToValue, numberWithCommas} from '../../shared/utility'; 
import YesNoButton from '../../shared/UI/Buttons/YesNoButton/YesNoButton';

class Market extends Component {
    componentDidMount() {
        this.props.onFetchMarket(); 
    }
    
    render() {
        let market = []; 
        if (this.props.market) {
            const rawmarket = Object.entries(this.props.market);
            for (const [item, info] of rawmarket) {
                market.push(<Item 
                    key={item.split('|')[1]} 
                    name={item.split('|')[0]} 
                    price={numberWithCommas(info.price)} 
                    rarity={info.rarity} 
                    // onClick={() => this.marketItemClickedHandler(info.itemID, item)}
                />)
            }
            market.sort((a, b) => {
                const priceA = parseInt(a.props.price.replace(/,/g, ''));
                const priceB = parseInt(b.props.price.replace(/,/g, ''));

                if (priceA > priceB) return -1;
                if (priceA < priceB) return 1; 

                if (mapRarityToValue(a.props.rarity) > mapRarityToValue(b.props.rarity)) return -1;
                if (mapRarityToValue(a.props.rarity) < mapRarityToValue(b.props.rarity)) return 1;

                else return -1;
            }); 
        }

        return (this.props.fetchMarketLoading ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> :
            this.props.fetchError ? <div className={classes.FetchErrorMessage}>{this.props.fetchError}</div> :
            market.length !== 0 ? 
            <div className={classes.Market}>
                {market}
            </div> :
            <div className={classes.MarketNullText}>
                Nothing to show! 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        market: state.market.market,
        fetchMarketLoading: state.market.fetchMarketLoading,
        fetchError: state.market.fetchError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMarket: () => dispatch(actions.fetchMarket())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
