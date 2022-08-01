import React, { Component } from 'react'; 
import classes from './Market.module.css'; 
import Item from '../../components/Item/Item'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import { rarityInfo, numberWithCommas } from '../../shared/utility'; 
import BuyForm from '../../components/BuyForm/BuyForm'; 

class Market extends Component {
    state = {
        showBuyForm: false,
        currentItemName: '',
        currentItemRarity: '',
        currentListTime: '',
        currentSeller: '',
        currentItemPrice: 0,
        currentMarketID: 0
    }

    componentDidMount() {
        this.props.onFetchMarket(); 
    }

    componentDidUpdate(prevProps) {
        if (this.props.market && this.props.market !== prevProps.market && this.state.showBuyForm) {
            for (const key of Object.keys(this.props.market)) {
                if (this.state.currentMarketID === Number(key)) return; 
            }
            this.setState({showBuyForm: false});
        }
    }

    backdropClickedHandler = () => {
        if (!this.props.buyItemLoading) {
            this.setState({showBuyForm: false});
            this.props.onClearBuyError(); 
        }
    }

    marketItemClickedHandler = (itemID, info) => {
        this.setState({
            showBuyForm: true,
            currentItemName: info.itemName,
            currentItemRarity: info.rarity,
            currentListTime: info.listTime,
            currentSeller: info.seller,
            currentItemPrice: info.price,
            currentMarketID: Number(itemID)
        }); 
    }

    submitHandler = async() => {
        await this.props.onBuyItem(this.props.token, this.state.currentMarketID); 
        if (this.props.buyError === null) {
            this.backdropClickedHandler(); 
            this.props.onChangeSP(-this.state.currentItemPrice);
        }
    }
    
    render() {
        const market = []; 
        if (this.props.market) {
            const rawMarket = Object.entries(this.props.market);
            for (const [itemID, info] of rawMarket) {
                market.push(
                    <Item 
                        key={itemID} 
                        name={info.itemName}
                        price={numberWithCommas(info.price)} 
                        rarity={info.rarity} 
                        onClick={() => this.marketItemClickedHandler(itemID, info)}
                    />
                );
            }
            market.sort((a, b) => {
                const priceA = parseInt(a.props.price.replace(/,/g, ''));
                const priceB = parseInt(b.props.price.replace(/,/g, ''));

                if (priceA > priceB) return -1;
                if (priceA < priceB) return 1; 

                if (rarityInfo[a.props.rarity][1] > rarityInfo[b.props.rarity][1]) return -1;
                if (rarityInfo[a.props.rarity][1] < rarityInfo[b.props.rarity][1]) return 1;

                else return -1;
            }); 
        }

        return (
            this.props.fetchMarketLoading 
                ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> 
                : this.props.fetchError 
                    ? <div className={classes.FetchError}>{this.props.fetchError}</div> 
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
                                    submitHandler={this.submitHandler}
                                    user={this.props.user}
                                    sp={this.props.sp}
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
        sp: state.authentication.sp,
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
