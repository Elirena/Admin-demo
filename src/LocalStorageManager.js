export default class LocalStorageManager {

    /*** получить пользоватя по id*/
    static getUser(userId) {
        return userId ? JSON.parse(localStorage.getItem(userId)) : {}
    }

    /*** сохранить описание*/
    static setUserDescription(userId, text) {
        const user = this.getUser(userId) || {};
        user.description = text;
        localStorage.setItem(userId, JSON.stringify(user));
    }

    /*** сохранить изображение*/
    static setUserImg(userId, imgBase64) {
        const user = Object.assign({},this.getUser(userId) || {});
        user.image = imgBase64;
        localStorage.setItem(userId, JSON.stringify(user));
    }
}