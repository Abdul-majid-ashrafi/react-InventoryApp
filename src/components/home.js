import React, { Component } from 'react';
// import { Loggedin } from '../store/action/auth'
// import { connect } from 'react-redux'
import { FirebaseService } from '../helpers/firebaseService'
import * as mat from 'material-ui';
import { Link } from 'react-router';


class Home extends Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }
    logOut() {
        FirebaseService.auth.signOut().then(() => {
            this.context.router.push({
                pathname: '/login'
            })
        }, (error) => {
            alert(error)
            console.log(error)
        });
    }
    render() {
        const style = {
            margin: '15px',
        };
        return (
            <div>
                <mat.AppBar
                    title="Inventry App" showMenuIconButton={false}>
                    <Link to="/create_store">
                        <mat.RaisedButton label="Create Store" type="button" primary={true} style={style} />
                    </Link>
                    <Link to="/product">
                        <mat.RaisedButton label="Create Product" type="button" primary={true} style={style} />
                    </Link>
                    <Link to="/purchase">
                        <mat.RaisedButton label="Add Purchase" type="button" primary={true} style={style} />
                    </Link>
                    <Link to="/sale">
                        <mat.RaisedButton label="Add Sale" type="button" primary={true} style={style} />
                    </Link>
                    <Link to="/view_stock">
                        <mat.RaisedButton label="Purchases" type="button" primary={true} style={style} />
                    </Link>
                    <Link to="/view_sale">
                        <mat.RaisedButton label="Sales" type="button" primary={true} style={style} />
                    </Link>
                    <Link to="/view_stocks">
                        <mat.RaisedButton label="Stock" type="button" primary={true} style={style} />
                    </Link>
                    <mat.RaisedButton label="LogOut" onClick={this.logOut} type="button" primary={true} style={style} />
                </mat.AppBar>

                {this.props.children}
            </div>
        );
    }
}
Home.contextTypes = {
    router: React.PropTypes.object.isRequired
}
// const mapStateToProps = (state) => { // mapStateToProps ye iska apna function he
//     return {
//         authReducer: state
//     }
// }
// const mapDispatchToProps = (dispatch) => { // mapDispatchToProps ye iska apna function he
//     return {
//         Loggedin: (data) => {
//             dispatch(Loggedin(data))
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home

                        // <List>
                        //     <ListItem
                        //         primaryText="Name"
                        //         secondaryText={this.props.authReducer.user.firstname + " " + this.props.authReducer.user.lastname}
                        //         />
                        //     <ListItem
                        //         primaryText="Email"
                        //         secondaryText={this.props.authReducer.user.email}
                        //         />
                        //     <ListItem
                        //         primaryText="Age"
                        //         secondaryText={this.props.authReducer.user.age}
                        //         />
                        //     <ListItem
                        //         primaryText="Blood Group"
                        //         secondaryText={this.props.authReducer.user.blood}
                        //         />
                        // </List>