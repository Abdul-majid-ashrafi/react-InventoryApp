import * as React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';



export class SigninComponent extends React.Component {


    render() {
        const center = {
            width: '90%',
            margin: '0 auto'
        }
        return (
            <div style={center}>
                <AppBar
                    title="Please Signin"
                    showMenuIconButton={false} />
                <form onSubmit={this.props._submit}>
                    <TextField
                        type="email"
                        hintText="email"
                        name="email"
                        onChange={this.props._inputHandler}
                        required fullWidth
                    /><br />

                    <TextField
                        type="password"
                        hintText="password"
                        name="pass"
                        onChange={this.props._inputHandler}
                        required fullWidth
                    /><br />
                    <RaisedButton type="submit" label="Sign in" primary={true} />
                </form>
            </div>
        )
    }
}
SigninComponent.PropTypes = {
    _inputHandler: React.PropTypes.func.isRequired,
    _submit: React.PropTypes.func.isRequired

}