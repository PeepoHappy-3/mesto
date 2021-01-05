export class UserInfo {
    constructor(info) {
        this._userNameSelector = info.profileName;
        this._userJobSelector = info.profileJob;
        this._userAvatarSelector = info.profileAvatar;
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
        this._id = userData._id;
    }
    getUserId() {
        return this._id;
    }
    setUserAvatar(data) {
        document.querySelector(this._userAvatarSelector).src = data;
    }
}