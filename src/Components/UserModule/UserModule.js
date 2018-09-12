import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import GetIdActions from '../../actions/GetIdActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import "flat-ui/css/flat-ui.css";

/***
 * User module
 * */

class UserModule extends Component {
    constructor(props){
        super(props);
        this.goToUserId = this.goToUserId.bind(this);
    }

    /*** переход на профиль пользователя */
    goToUserId(){
        const id = this.props.id;
        GetIdActions.getId(id);
        this.props.history.push(`/users/${id}`)
    }

    render() {
        const {
            id,
            fullName,
            email,
        } = this.props;

        return (
            <li className="todo-done">
                <div className="user-icon fui-user col-1"> </div>
                <div className="todo-content row">
                    <div className="user-id col-4">{id}</div>
                    <span className="user-name col-2">{fullName}</span>
                    <span className="user-mail col-4">{email}</span>
                    <button className="col-1 btn btn-primary btn-block btn-small"
                            onClick={this.goToUserId}>userId
                    </button>
                </div>
            </li>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(withRouter(UserModule));