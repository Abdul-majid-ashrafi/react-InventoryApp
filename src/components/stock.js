import React, { Component } from 'react';
import { FirebaseService } from '../helpers/firebaseService'
import { CreateStore, CreateProduct } from '../store/action/auth'
import { connect } from 'react-redux'
import * as mat from 'material-ui';

class StockData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productData: []
        }
    }
    componentDidMount() {
        let productArray = []
        FirebaseService.ref.child('/products').on('child_added', (snapshot) => {
            productArray.push(snapshot.val())
            this.props.createProduct(productArray)
            this.setState({ productData: this.props.stockReducer.productData })
        })
    }
    render() {
        const center = {
            width: '50%',
            margin: '0 auto'
        }
        const style = {
            padding: '10px',
            textAlign: 'center'
        };
        return (
            <div>
                <div style={center}>
                    <br />
                    <br />
                    <mat.AppBar
                        title="View Purchase Details"
                        showMenuIconButton={false} />
                    <mat.Paper style={style} zDepth={3}>
                        <mat.Table>
                            <mat.TableHeader displayRowCheckbox={false}>
                                <mat.TableRow>
                                    <mat.TableHeaderColumn>Store Area</mat.TableHeaderColumn>
                                    <mat.TableHeaderColumn>Products</mat.TableHeaderColumn>
                                    <mat.TableHeaderColumn>Quantity</mat.TableHeaderColumn>
                                    <mat.TableHeaderColumn>Price</mat.TableHeaderColumn>
                                    <mat.TableHeaderColumn>Description</mat.TableHeaderColumn>
                                </mat.TableRow>
                            </mat.TableHeader>
                            <mat.TableBody displayRowCheckbox={false}>
                                {
                                    this.state.productData.map((v, i) => {
                                        return (
                                            <mat.TableRow key={i}>
                                                <mat.TableRowColumn> {v.store}</mat.TableRowColumn>
                                                <mat.TableRowColumn> {v.product}</mat.TableRowColumn>
                                                <mat.TableRowColumn> {v.quantity}</mat.TableRowColumn>
                                                <mat.TableRowColumn> {v.unitPrice}</mat.TableRowColumn>
                                                <mat.TableRowColumn> {v.dec}</mat.TableRowColumn>
                                            </mat.TableRow>
                                        )
                                    })}
                            </mat.TableBody>
                        </mat.Table>
                    </mat.Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => { // mapStateToProps ye iska apna function he
    return {
        stockReducer: state.MainReducer
    }
}
const mapDispatchToProps = (dispatch) => { // mapDispatchToProps ye iska apna function he
    return {
        createStore: (data) => {
            dispatch(CreateStore(data))
        },
        createProduct: (data) => {
            dispatch(CreateProduct(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StockData);
