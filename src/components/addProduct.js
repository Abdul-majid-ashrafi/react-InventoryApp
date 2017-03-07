import React, { Component } from 'react';
// import { CreateStore } from '../store/action/auth'
// import { connect } from 'react-redux'
import { FirebaseService } from '../helpers/firebaseService'
import * as mat from 'material-ui';

class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: '',
            dec: '',
            unitPrice: 0,
            quantity: 0,
            userID: ''
        }
        this.inputHandler = this.inputHandler.bind(this)
        this.submit = this.submit.bind(this)
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
        e.preventDefault()
        this.state.userID = localStorage.getItem('currentUser')

        let refRoot = FirebaseService.ref.child('/products').push(this.state);
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
                        title="Create Product"
                        showMenuIconButton={false} />
                    <mat.Paper style={style} zDepth={3}>
                        <form onSubmit={this.submit}>
                            <mat.TextField
                                hintText="Product name"
                                name="product"
                                onChange={this.inputHandler}
                                required
                            /><br />

                            <mat.TextField
                                hintText="Description"
                                name="dec"
                                onChange={this.inputHandler}
                                required
                            /><br />
                            <mat.RaisedButton type="submit" label="Add" primary={true} />
                        </form>
                    </mat.Paper>
                </div>
            </div>


        );
    }
}
AddProduct.contextTypes = {
    router: React.PropTypes.object.isRequired
}
// const mapStateToProps = (state) => { // mapStateToProps ye iska apna function he
//     return {
//         createStoreReducer: state.MainReducer
//     }
// }
// const mapDispatchToProps = (dispatch) => { // mapDispatchToProps ye iska apna function he
//     return {
//         createStore: (data) => {
//             dispatch(CreateStore(data))
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
export default AddProduct;
