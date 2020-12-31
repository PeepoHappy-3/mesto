export class UserInfo {
    constructor(info) {
        this._userNameSelector = info.name;
        this._userJobSelector = info.about;
        this._avatarSelector = info.avatar;
    }
    getUserInfo() {
        const userName = document.querySelector(this._userNameSelector).innerText;
        const userJob = document.querySelector(this._userJobSelector).innerText;
        return {
            name: userName,
            about: userJob
        }
    }
    setUserInfo(userData) {
        document.querySelector(this._userNameSelector).innerText = userData.name;
        document.querySelector(this._userJobSelector).innerText = userData.about;
        document.querySelector(this._avatarSelector).src = userData.avatar;
    }


}