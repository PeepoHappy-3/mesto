export class UserInfo {
    constructor(info) {
        this._userNameSelector = info.userName;
        this._userJobSelector = info.userJob;
    }
    getUserInfo() {
        const userName = document.querySelector(this._userNameSelector).textContent;
        const userJob = document.querySelector(this._userJobSelector).textContent;
        return {
            userName: userName,
            userJob: userJob
        }
    }
    setUserInfo(userData) {
        document.querySelector(this._userNameSelector).innerText = userData.popupName;
        document.querySelector(this._userJobSelector).innerText = userData.popupJob;
    }
}