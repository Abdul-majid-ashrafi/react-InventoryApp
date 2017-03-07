import React, { Component } from 'react';
import { FirebaseService } from '../helpers/firebaseService'
import * as mat from 'material-ui';

class storeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: '',
            location: '',
            userID : ''
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
        this.state.userID = localStorage.getItem('currentUser')
        e.preventDefault()
        let refRoot = FirebaseService.ref.child('/stores').push(this.state);
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
                        title="Create Store"
                        showMenuIconButton={false} />
                    <mat.Paper style={style} zDepth={3}>
                        <form onSubmit={this.submit}>
                            <mat.TextField
                                hintText="Store name"
                                name="store"
                                onChange={this.inputHandler}
                                required
                            /><br />

                            <mat.TextField
                                hintText="Location"
                                name="location"
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
storeComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}
// const mapStateToProps = (state) => { // mapStateToProps ye iska apna function he
//     console.log(state)
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
// export default connect(mapStateToProps, mapDispatchToProps)(storeComponent);
export default storeComponent;
