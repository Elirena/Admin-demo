import {USER_ID_GOT,USERIMG_CHANGE} from '../constants/UserIDConstants';
import store from '../stores';
import LocalStorageManager from '../LocalStorageManager';

export default class GetIdActions {

    /*** Получение данных пользователя */
    static getId(id) {
        const usersList = store.getState().users.usersList;
        const userInfo = usersList.find(userInfo => userInfo.id === id);
        const localInfo = LocalStorageManager.getUser(userInfo.id);
        store.dispatch({
            type: USER_ID_GOT,
            userInfo: userInfo,
            localInfo: localInfo
        });
    }

    /*** Обновить описание*/
    static changeDescription(text) {
        const {id} = store.getState().userId.userInfo;
        LocalStorageManager.setUserDescription(id, text);

    }

    /*** Обновить фото*/
    static changeUserImg(imgBase64) {
        const {id} = store.getState().userId.userInfo;
        LocalStorageManager.setUserImg(id, imgBase64);
        store.dispatch({
            type: USERIMG_CHANGE,
            image: imgBase64
        });
    }
}