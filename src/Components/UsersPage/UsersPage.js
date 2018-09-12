import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import GetUsersActions from '../../actions/GetUsersActions';
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import UserModule from "../UserModule/UserModule";

import 'bootstrap/dist/css/bootstrap.min.css';
import "flat-ui/css/flat-ui.css";
import "./UsersPage.css";

/**
 * Users Page
 */

class UsersPage extends Component {

    /*** проверка авторизации и редирект */
    componentWillMount(){
       const auth = this.props.auth;
       if (!auth) {
          this.props.history.replace('/auth')
       }
    }

    render() {
        const {
            status, error, usersList
        } = this.props.users;
        return (
            <div className="col-12 users">
                <h3 className="users-page_title">All users</h3>
                <div className="users-list todo">
                    <React.Fragment>
                        {
                            //пришла ошибка
                            (status === 'error') ? (
                                <div className=""> {error.message}</div>
                            ) :
                            //отрисовываем всех пользователей
                            (status === 'got') ? (
                                <ul>
                                    {
                                        Object.keys(usersList).map((itemKey,key) => (
                                            <UserModule key={`itemmodule-${key}`}
                                                        id={usersList[itemKey].id}
                                                        fullName={usersList[itemKey].fullName}
                                                        email={usersList[itemKey].email}
                                            />
                                        ))
                                    }
                                </ul>

                            ) : (
                                //ожидание загрузки
                                <div className="emptiness">
                                    Загрузка данных
                                </div>
                            )
                        }
                    </React.Fragment>
                </div>
                <div className="pagination">
                    <PaginationBlock/>
                </div>
            </div>
        );
    }

    /*** получаем список пользователей*/
    componentDidMount(){
        GetUsersActions.getUsers();
    }
}

function mapStateToProps(state){
    return {
        users: state.users,
        auth: state.auth.auth
    }
}

export default connect(mapStateToProps)(withRouter(UsersPage));

