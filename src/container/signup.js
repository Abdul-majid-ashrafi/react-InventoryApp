/*import * as React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

export class SignupComponent extends React.Component {

    render() {
        const style = {
            fontSize: '17px',
            padding: '2px 23px 2px 23px',
            boxShadow: '5px 5px 5px black',
            border: 'outset 3px red'
        }
        const center = {
            width: '90%',
            margin: '0 auto'
        }
        return (
            <div style={center}>
                <AppBar
                    title="Register your account"
                    showMenuIconButton={false} />
                <form onSubmit={this.props._submit} >
                    <TextField
                        hintText="First Name"
                        name="firstname"
                        value={this.props.signUpState.firstname}
                        required fullWidth autoFocus
                        onChange={this.props._inputHandler}
                        /><br />

                    <TextField
                        hintText="Last Name"
                        name="lastname"
                        value={this.props.signUpState.lastname}
                        required fullWidth
                        onChange={this.props._inputHandler}
                        /><br />

                    <TextField
                        hintText="Age"
                        name="age"
                        value={this.props.signUpState.age}
                        required fullWidth
                        onChange={this.props._inputHandler}
                        /><br />

                    <TextField
                        type="email"
                        hintText="email"
                        name="email"
                        value={this.props.signUpState.email}
                        required fullWidth
                        onChange={this.props._inputHandler}
                        /><br />

                    <TextField
                        type="password"
                        hintText="Password"
                        name="pass"
                        value={this.props.signUpState.pass}
                        required fullWidth
                        onChange={this.props._inputHandler}
                        /><br />
                    <br />
                    <br />

                    <select style={style}
                        name="blood"
                        value={this.props.signUpState.blood}
                        required
                        onChange={this.props._inputHandler}>
                        <option>Blood Type   </option>
                        <option value="A">A+   </option>
                        <option value="B">B+   </option>
                        <option value="O">O+   </option>
                        <option value="AB">AB+</option>
                    </select>
                    <br />
                    <br />
                    <RaisedButton type="submit" label="Sign up" primary={true} /> <br />
                </form>
            </div>
        )
    }
}
SignupComponent.PropTypes = {
    _inputHandler: React.PropTypes.func.isRequired,
    _submit: React.PropTypes.func.isRequired

}*/