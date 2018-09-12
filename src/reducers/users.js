import {
    USERS_LIST_REQUEST,
    USERS_LIST_GOT,
    USERS_LIST_FAILED
} from '../constants/UsersConstants';

const initialState = {

    /** * статус выполнения запросов*/
    status: '',

    /** * список пользователей*/
    usersList: [],

    /*** пагинация*/
    pagination: {},

    /*** Данные об ошибке*/
    error: undefined
};

const users = (state = initialState, action) => {
    switch (action.type) {

        //запрос на получение списка пользователей
        case USERS_LIST_REQUEST:
            return Object.assign({}, state, {
                status: 'request'
            });

        //список пользователей получен
        case USERS_LIST_GOT:
            return Object.assign({}, state, {
                status: 'got',
                usersList: action.users,
                pagination: action.pagination
            });

        //ошибка при получении списка пользователей
        case USERS_LIST_FAILED:
            return Object.assign({}, state, {
                status: 'error',
                usersList: initialState.usersList,
                error: action.error
            });

        default:
            return state;
    }
};

export default users;