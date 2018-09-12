import React, { Component } from 'react';
import AuthActions from '../../actions/AuthActions';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "flat-ui/css/flat-ui.css";
import "./AuthPage.css";

const {gapi} = window;
const CLIENT_ID = "882362442098-73umjjpuirqch0kivkhjgicsju2tgrv3.apps.googleusercontent.com";

/**
 * Authorization Page
 */

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: undefined, //гугловый объект авторизации
        };
        this.auth = this.auth.bind(this);
    }

    auth() {
        const {auth} = this.state;
        AuthActions.authUser(auth);
    }

    /*** переадресация после авторизации*/
    componentWillReceiveProps(newProps) {
        const {auth} = newProps;
        if (auth) {
            newProps.history.push('/users')
        }
    }

    render() {
        return (
                <div className="login-screen">
                    <div className="login-title">
                        <h2>Authorization</h2>
                    </div>
                    <div className="col-2 center ">
                        <a className="btn btn-primary btn-lg btn-block"
                            onClick={this.auth}>Log in</a>
                    </div>
                </div>
        );
    }

    /*** авторизация google*/
    componentDidMount() {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({client_id: CLIENT_ID});
            this.setState({
                auth: gapi.auth2.getAuthInstance()
            })
        });
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth.auth
    }}

export default connect(mapStateToProps)(withRouter(AuthPage));
