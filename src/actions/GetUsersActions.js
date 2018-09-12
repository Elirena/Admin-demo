import {
    USERS_LIST_REQUEST,
    USERS_LIST_GOT,
    USERS_LIST_FAILED
    } from '../constants/UsersConstants';
import store from '../stores';
import axios from 'axios';

const USERS_PATH = "https://front-test.now.sh/users";
const TOKEN = "18476dc1c4fb11f4eebd2c4aaacdb3c14b3cd1e945dd8bc8456b73c8d4ef33cf";

export default class GetUsersActions {

    static getUrl(offset = '', token = TOKEN) {
        return `${USERS_PATH}?token=${token}${offset ? '&'+offset : ''}`
    }

    /*** Получение списка пользователей */
    static getUsers(offset) {
        Promise.resolve()
            .then(() => store.dispatch({type: USERS_LIST_REQUEST}))
            .then(() => axios.get(this.getUrl(offset)))
            .then(res => {
                store.dispatch({
                    type: USERS_LIST_GOT,
                    users: res.data.data,
                    pagination: res.data.pagination,
                });
            })
            .catch(error => store.dispatch({
                type: USERS_LIST_FAILED,
                error: error
            }))
    }
}
