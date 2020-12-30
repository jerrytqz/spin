import React, { Component } from 'react'; 
import classes from './Market.module.css'; 
import Item from '../../components/Item/Item'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import { mapRarityToValue, numberWithCommas } from '../../shared/utility'; 
import BuyForm from '../../components/BuyForm/BuyForm'; 

class Market extends Component {
    state = {
        showBuyForm: false,
        currentItemName: '',
        currentItemRarity: '',
        currentListTime: '',
        currentSeller: '',
        currentItemPrice: 0,
        currentMarketID: ''
    }

    componentDidMount() {
        this.props.onFetchMarket(); 
    }

    backdropClickedHandler = () => {
        this.setState({showBuyForm: false});
        this.props.onClearBuyError(); 
    }

    marketItemClickedHandler = (item, info) => {
        this.setState({
            showBuyForm: true,
            currentItemName: item.split('|')[0],
            currentItemRarity: info.rarity,
            currentListTime: info.listTime,
            currentSeller: info.seller,
            currentItemPrice: info.price,
            currentMarketID: item.split('|')[1]
        }); 
    }

    buyClickedHandler = async() => {
        await this.props.onBuyItem(this.props.token, this.state.currentMarketID); 
        if (this.props.buyError === null) {
            this.backdropClickedHandler(); 
            this.props.onChangeSP(-this.state.currentItemPrice);
        }
    }
    
    render() {
        let market = []; 
        if (this.props.market) {
            const rawmarket = Object.entries(this.props.market);
            for (const [item, info] of rawmarket) {
                market.push(
                    <Item 
                        key={item.split('|')[1]} 
                        name={item.split('|')[0]} 
                        price={numberWithCommas(info.price)} 
                        rarity={info.rarity} 
                        onClick={() => this.marketItemClickedHandler(item, info)}
                    />
                );
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

        return (
            this.props.fetchMarketLoading 
                ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> 
                : this.props.fetchError 
                    ? <div className={classes.FetchErrorMessage}>{this.props.fetchError}</div> 
                    : market.length !== 0 
                        ? 
                            <div className={classes.Market}>
                                {market}
                                <BuyForm 
                                    show={this.state.showBuyForm} 
                                    clicked={this.backdropClickedHandler}
                                    name={this.state.currentItemName}
                                    rarity={this.state.currentItemRarity}
                                    listTime={this.state.currentListTime}
                                    seller={this.state.currentSeller}
                                    price={this.state.currentItemPrice}
                                    isAuthenticated={this.props.isAuthenticated}
                                    loading={this.props.buyItemLoading}
                                    error={this.props.buyError}
                                    onClickBuy={this.buyClickedHandler}
                                    user={this.props.user}
                                    SP={this.props.SP}
                                />
                            </div> 
                        :
                            <div className={classes.MarketNullText}>
                                Nothing to show! 
                            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        token: state.authentication.token,
        user: state.authentication.user, 
        SP: state.authentication.SP,
        market: state.market.market,
        fetchMarketLoading: state.market.fetchMarketLoading,
        fetchError: state.market.fetchError,
        buyItemLoading: state.market.buyItemLoading,
        buyError: state.market.buyError 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMarket: () => dispatch(actions.fetchMarket()),
        onBuyItem: (token, marketID) => dispatch(actions.buyItem(token, marketID)),
        onClearBuyError: () => dispatch(actions.clearBuyError()),
        onChangeSP: (changeAmount) => dispatch(actions.changeSP(changeAmount))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
