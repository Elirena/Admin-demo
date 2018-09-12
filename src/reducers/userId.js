import {
    USER_ID_GOT,
    DESCRIPTION_CHANGE,
    USERIMG_CHANGE
} from '../constants/UserIDConstants';

const initialState = {

    /*** статус выполнения запросов*/
    status: '',

    /*** профиль пользователя*/
   userInfo: {
        email : "email",
        firstName : "Имя",
        fullName : "все имя",
        id : "",
        lastName : "Фамилия",
        location : ["-64.7369", "133.2044"],
    },

    /*** Редактируемые данные*/
    localInfo: {
        description: 'дополнительная информация',
        image: ''
    },

    /*** Данные об ошибке*/
    error: undefined
};

const userId = (state = initialState, action) => {
    switch (action.type) {

        //информация о пользователе
        case USER_ID_GOT:
            return Object.assign({}, state, {
                status: 'got',
                userInfo: action.userInfo,
                localInfo: action.localInfo || {}
            });
        //изменить описание
        case DESCRIPTION_CHANGE:
            return Object.assign({}, state, {
                description : action.description
            });

        case USERIMG_CHANGE:
            return Object.assign({}, state, {
                localInfo: Object.assign(state.localInfo, {image: action.image})
            });

        default:
            return state;
    }
};

export default userId;