import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_GOT,
    AUTH_LOGIN_FAILED,
} from '../constants/AuthConstants';
import store from '../stores';

export default class AuthActions {

/*** Авторизация пользователя */
    static authUser(gAuth) {
        Promise.resolve()
            .then(() => store.dispatch({type: AUTH_LOGIN_REQUEST}))
            .then(() => gAuth.signIn())
            .then(res => {
                store.dispatch({
                    type: AUTH_LOGIN_GOT,
                    name: res
                        .getBasicProfile()
                        .getName()
                })
            })
            .catch(error => store.dispatch({
                type: AUTH_LOGIN_FAILED,
                error: error
            }))
    }
}