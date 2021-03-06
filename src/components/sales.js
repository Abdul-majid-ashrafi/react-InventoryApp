import React, { Component } from 'react';
import { FirebaseService } from '../helpers/firebaseService'
import { CreateStore, CreateProduct } from '../store/action/auth'
import { connect } from 'react-redux'
import * as mat from 'material-ui';

class AddSaleDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unitPrice: '',
            quantity: '',
            date: '',
            storeData: [],
            productData: []
        }
        this.inputHandler = this.inputHandler.bind(this)
        this.dateHandler = this.dateHandler.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount() {
        let storeArray = []
        FirebaseService.ref.child('/stores').on('child_added', (snapshot) => {
            storeArray.push(snapshot.val())
            this.props.createStore(storeArray)
            this.setState({ storeData: this.props.mainReducer.storeData })
        })
        let productArray = []
        FirebaseService.ref.child('/products').on('child_added', (snapshot) => {
            productArray.push({ value: snapshot.val(), id: snapshot.key })
            this.props.createProduct(productArray)
            this.setState({ productData: this.props.mainReducer.productData })
        })
    }

    dateHandler(e, date) {
        this.setState({
            date: date,
        })
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
        e.preventDefault()
        let newObj = {
            store: this.refs.store.value,
            product: JSON.parse(this.refs.product.value),//this.refs.product.value,
            quantity: parseInt(this.state.quantity),
            unitPrice: parseInt(this.state.unitPrice),
            date: this.state.date.getDate() + "/" + this.state.date.getMonth() + "/" + this.state.date.getFullYear()
        }
        let refRoot = FirebaseService.ref.child(`/products/${newObj.product.id}`).once('value', (snapshot) => {
            if (parseInt(snapshot.val().quantity) < newObj.quantity || parseInt(snapshot.val().unitPrice) < newObj.unitPrice) {
                alert("Your Prodect quantity/Price is less then Your input")
                return
            }
            else {
                let total = {
                    quantity: parseInt(snapshot.val().quantity) - newObj.quantity,
                    unitPrice: parseInt(snapshot.val().unitPrice) - newObj.unitPrice,
                    store: newObj.store
                }
                let refRoot = FirebaseService.ref.child(`/products/${newObj.product.id}`).update(total);
            }
        })
        let purchaseObject = {
            store: newObj.store,
            product: newObj.product,
            quantity: newObj.quantity,
            unitPrice: newObj.unitPrice,
            product: newObj.product.value.product,
            dec: newObj.product.value.dec,
            date: newObj.date
        }
        FirebaseService.ref.child('/sales').push(purchaseObject)
            .then(() => {
                alert("Succsessfully created")
                this.context.router.push({
                    pathname: '/home'
                })
            })
            .catch((error) => alert(error.message))
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
                        title="Add Sales Invoice"
                        showMenuIconButton={false} />
                    <mat.Paper style={style} zDepth={3}>
                        <form onSubmit={this.submit}>
                            <mat.TextField
                                hintText="Quantity"
                                name="quantity"
                                onChange={this.inputHandler}
                                required
                            /><br />
                            <mat.DatePicker hintText="Sale Date"
                                onChange={this.dateHandler}
                            />
                            <mat.TextField
                                hintText="Unit Rs"
                                name="unitPrice"
                                onChange={this.inputHandler}
                                required
                            /><br />
                            <select style={style}
                                required
                                ref="store">
                                {
                                    this.state.storeData.map((v, i) => {
                                        return (
                                            <option value={v.store} key={i}> {v.store} </option>
                                        )
                                    })}
                            </select>
                            <br />
                            <br />
                            <select style={style}
                                required
                                ref="product">
                                {
                                    this.state.productData.map((v, i) => {
                                        return (
                                            <option value={JSON.stringify(v)} key={i}> {v.value.product} </option>
                                        )
                                    })}
                            </select>
                            <br />
                            <br />
                            <mat.RaisedButton type="submit" label="Add" primary={true} />
                        </form>
                    </mat.Paper>
                </div>
            </div>
        );
    }
}
AddSaleDetails.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state) => { // mapStateToProps ye iska apna function he
    return {
        mainReducer: state.MainReducer
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
export default connect(mapStateToProps, mapDispatchToProps)(AddSaleDetails);
// export default AddSaleDetails;
