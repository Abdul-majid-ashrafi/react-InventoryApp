import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App';
import Login from './components/login';
import Home from './components/home';
import storeComponent from './components/createStore';
import AddProduct from './components/addProduct';
import AddPurchaseDetails from './components/purchase';
import AddSaleDetails from './components/sales';
import ViewStockDetails from './components/viewStock';
import ViewSalesDetails from './components/viewSales';
import StockData from './components/stock';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

ReactDOM.render((
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/login" component={Login}></Route>
                <Route path="/home" component={Home}>
                    <Route path="/create_store" component={storeComponent}></Route>
                    <Route path="/product" component={AddProduct}></Route>
                    <Route path="/purchase" component={AddPurchaseDetails}></Route>
                    <Route path="/sale" component={AddSaleDetails}></Route>
                    <Route path="/view_stock" component={ViewStockDetails}></Route>
                    <Route path="/view_sale" component={ViewSalesDetails}></Route>
                    <Route path="/view_stocks" component={StockData}></Route>
                </Route>

                <Route path="/" component={App}>
                    <IndexRoute component={Login} />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>
),
    document.getElementById('root')
);
