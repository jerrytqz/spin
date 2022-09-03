import React, { Component } from 'react'; 
import classes from './Market.module.css'; 
import Item from '../../components/Item/Item'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner';
import { RARITY_INFO, numberWithCommas } from '../../shared/utility'; 
import BuyForm from '../../components/BuyForm/BuyForm'; 

class Market extends Component {
    state = {
        showBuyForm: false,
        currentItemName: '',
        currentItemRarity: '',
        currentListTime: 0,
        currentSeller: '',
        currentItemPrice: 0,
        currentMarketID: null
    }

    componentDidMount() {
        this.props.onFetchMarket(); 
        if (this.props.selectedItem) {
            const selectedID = Object.keys(this.props.selectedItem)[0];
            this.marketItemClickedHandler(selectedID, this.props.selectedItem[selectedID]);
        } 
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
            this.props.onResetBuyItemError(); 
        }
        if (this.props.selectedItem) this.props.onResetSelectedItem();
    }

    clickUnauthorizedBuyHandler = () => {
        this.props.history.push('/authentication');
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
        if (!this.props.isAuthenticated) {
            this.props.onSetSelectedItem({[itemID]: info});
        }
    }

    submitHandler = async () => {
        await this.props.onBuyItem(this.props.token, this.state.currentMarketID); 
        if (this.props.buyItemError === null) {
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

                if (RARITY_INFO[a.props.rarity][1] > RARITY_INFO[b.props.rarity][1]) return -1;
                if (RARITY_INFO[a.props.rarity][1] < RARITY_INFO[b.props.rarity][1]) return 1;

                else return -1;
            }); 
        }

        return (
            this.props.fetchMarketLoading 
                ? <div className={classes.LoadingSpinner}><LoadingSpinner/></div> 
                : this.props.fetchMarketError 
                    ? <div className={classes.FetchError}>{this.props.fetchMarketError}</div> 
                    : market.length !== 0 
                        ? 
                            <div className={classes.Market}>
                                {market}
                                <BuyForm 
                                    show={this.state.showBuyForm} 
                                    backdropClicked={this.backdropClickedHandler}
                                    onClickUnauthorizedBuy={this.clickUnauthorizedBuyHandler}
                                    name={this.state.currentItemName}
                                    rarity={this.state.currentItemRarity}
                                    listTime={this.state.currentListTime}
                                    seller={this.state.currentSeller}
                                    price={this.state.currentItemPrice}
                                    isAuthenticated={this.props.isAuthenticated}
                                    loading={this.props.buyItemLoading}
                                    error={this.props.buyItemError}
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
        fetchMarketError: state.market.fetchMarketError,
        buyItemLoading: state.market.buyItemLoading,
        buyItemError: state.market.buyItemError,
        selectedItem: state.market.selectedItem 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMarket: () => dispatch(actions.fetchMarket()),
        onBuyItem: (token, marketID) => dispatch(actions.buyItem(token, marketID)),
        onResetBuyItemError: () => dispatch(actions.resetBuyItemError()),
        onChangeSP: (changeAmount) => dispatch(actions.changeSP(changeAmount)),
        onSetSelectedItem: (item) => dispatch(actions.setSelectedItem(item)),
        onResetSelectedItem: () => dispatch(actions.resetSelectedItem())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
