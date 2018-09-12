import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "flat-ui/css/flat-ui.css";
import "./TopBlock.css";

/**
 * Top panel
 */

class TopBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginStatus: true
        }
    }

    render() {
        const login = this.props.auth.name;
        return (
                <nav className="navbar navbar-inverse navbar-embossed navbar-expand-lg">
                    <span className="navbar-brand">{this.state.loginStatus ? login : "unlogged"}</span>
                </nav>
        );
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }}

export default connect(mapStateToProps)(TopBlock);
