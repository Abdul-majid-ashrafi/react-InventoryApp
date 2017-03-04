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
            console.log(snapshot.val())
            this.props.createStore(storeArray)
            this.setState({ storeData: this.props.mainReducer.storeData })
        })
        let productArray = []
        FirebaseService.ref.child('/products').on('child_added', (snapshot) => {
            productArray.push(snapshot.val())
            this.props.createProduct(productArray)
            this.setState({ productData: this.props.mainReducer.productData })
        })
    }

    dateHandler(e, date) {
        console.log(date)
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

        let newObj = {
            store: this.refs.store.value,
            product: this.refs.product.value,
            quantity: this.state.quantity,
            unitPrice: this.state.unitPrice,
            date: this.state.date.getDate() + "/" + this.state.date.getMonth() + "/" + this.state.date.getFullYear()
        }

        e.preventDefault()
        let refRoot = FirebaseService.ref.child('/sales').push(newObj);
        refRoot.then(() => {
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
                                            <option value={v.product} key={i}> {v.product} </option>
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
