import React, { Component } from 'react';
import { FirebaseService } from '../helpers/firebaseService'
import { ViewStock } from '../store/action/auth'
import { connect } from 'react-redux'
import * as mat from 'material-ui';

class ViewStockDetails extends Component {
    constructor(props) {
        super(props)
        this.state = { arr: [] }
    }
    componentDidMount() {
        let stockArray = []
        FirebaseService.ref.child('/purchase').on('child_added', (snapshot) => {
            stockArray.push(snapshot.val())
            console.log(snapshot.val())
            this.props.viewStore(stockArray)
            this.setState({ arr: this.props.mainReducer.viewPurchaseData })
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
                                </mat.TableRow>
                            </mat.TableHeader>
                            <mat.TableBody displayRowCheckbox={false}>
                                {
                                    this.state.arr.map((v, i) => {
                                        return (
                                            <mat.TableRow key={i}>
                                                <mat.TableRowColumn> {v.store}</mat.TableRowColumn>
                                                <mat.TableRowColumn> {v.product}</mat.TableRowColumn>
                                                <mat.TableRowColumn> {v.quantity}</mat.TableRowColumn>
                                                <mat.TableRowColumn> {v.unitPrice}</mat.TableRowColumn>
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
        mainReducer: state.MainReducer
    }
}
const mapDispatchToProps = (dispatch) => { // mapDispatchToProps ye iska apna function he
    return {
        viewStore: (data) => {
            dispatch(ViewStock(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewStockDetails);
