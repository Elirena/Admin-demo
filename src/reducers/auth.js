import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_GOT,
    AUTH_LOGIN_FAILED,
} from '../constants/AuthConstants';

const initialState = {
    /**
     * Флаг авторизации
     * @type {Boolean}
     */
    auth: false,

    /**
     * Текущий статус выполнения запросов
     * @type {String}
     */
    status: '',

    /**
     * Данные пользователя
     * @type {String}
     */
    name: 'unlogged',

    /**
     * Ошибка, возникшая при авторизации пользователя
     * @type {Object}
     */
    error: undefined
};

const auth = (state = initialState, action) => {
    switch (action.type) {

        //запрос на авторизацию пользователя
        case AUTH_LOGIN_REQUEST:
            return Object.assign({}, state, {
                auth: false,
                status: 'request',
                name: 'unlogged',
                error: undefined
            });

       //авторизация пользователя прошла успешно
        case AUTH_LOGIN_GOT:
            return Object.assign({}, state, {
                auth: true,
                status: 'got',
                error: undefined,
                name: action.name,
            });

        //ошибка при авторизации пользователя
        case AUTH_LOGIN_FAILED:
            return Object.assign({}, state, {
                auth: false,
                status: 'error',
                error: undefined,
                name: 'unlogged',
            });

        default:
            return state;
    }
};

export default auth;