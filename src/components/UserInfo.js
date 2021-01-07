export class UserInfo {
    constructor(info) {
        this._userNameSelector = info.profileName;
        this._userJobSelector = info.profileJob;
        this._userAvatarSelector = info.profileAvatar;
        this._userName = document.querySelector(this._userNameSelector);
        this._userAbout = document.querySelector(this._userJobSelector);
        this._avatar = document.querySelector(this._userAvatarSelector);
    }
    getUserInfo() {
        return {
            name: this._userName.innerText,
            about: this._userAbout.innerText
        }
    }
    setUserInfo(userData) {
        this._userName.innerText = userData.name;
        this._userAbout.innerText = userData.about;
        this._id = userData._id;
    }
    getUserId() {
        return this._id;
    }
    setUserAvatar(data) {
        this._avatar.src = data;
    }
}