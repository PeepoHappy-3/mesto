export class UserInfo {
    constructor(info) {
        this._userNameSelector = info.profileName;
        this._userJobSelector = info.profileJob;
    }
    getUserInfo() {
        const userName = document.querySelector(this._userNameSelector).innerText;
        const userJob = document.querySelector(this._userJobSelector).innerText;
        return {
            profileName: userName,
            profileJob: userJob
        }
    }
    setUserInfo(userData) {
        document.querySelector(this._userNameSelector).innerText = userData.profileName;
        document.querySelector(this._userJobSelector).innerText = userData.profileJob;
    }
}