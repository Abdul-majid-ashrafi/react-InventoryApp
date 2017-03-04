import React, { Component } from 'react';
import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;

            //  {(this.props.location.pathname === '/') ? <Link to="/home">Home</Link> : ''}



            //         {console.log("state", this.state)}
            //         {/*<h1>Hello World</h1>*/}
            //         {(this.props.location.pathname !== '/') ? <div> <Link to="/signup">SignUp</Link> <Link to="/login">Login</Link></div> : ''}
