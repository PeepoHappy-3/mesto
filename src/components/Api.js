export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.token;
    }
    getProfileInfo(link, handler) {
        fetch(this._baseUrl + `${link}`, {
                headers: {
                    authorization: this._token
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status + ':' + res.statusText);
            })
            .then(data => {
                handler(data);
            }).catch(err => {
                console.log(err);
            });
    }
    setProfileInfo(link, data, handler, renderLoading) {

        renderLoading(true);
        fetch(this._baseUrl + `${link}`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    data
                )
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status + ':' + res.statusText);
            })
            .then(data => {
                handler(data)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                renderLoading(false);
            });

    }
    getInitialCards(link, handler) {
        return fetch(this._baseUrl + `${link}`, {
                method: 'GET',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status + ':' + res.statusText);
            })
            .then(data => {
                handler(data);
            }).catch(err => {
                console.log(err);
            })
    }
    postNewCard(link, data, addCard, renderLoading) {
        renderLoading(true);
        fetch(this._baseUrl + `${link}`, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    data
                )
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status + ':' + res.statusText);
            })
            .then(data => {
                addCard(data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                renderLoading(false);
            })
    }
    deleteCard(id, handler) {
        fetch(this._baseUrl + `cards` + `/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status + ':' + res.statusText);
            })
            .then(data => {
                handler();
            }).catch(err => {
                console.log(err);
            });
    }
    putLike(id, handler) {
        fetch(this._baseUrl + `cards/likes` + `/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status + ':' + res.statusText);
            })
            .then(data => {
                handler(data);
            }).catch(err => {
                console.log(err);
            });
    }
    deleteLike(id, handler) {
        fetch(this._baseUrl + `cards/likes` + `/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status + ':' + res.statusText);
            })
            .then(data => {
                handler(data);
            }).catch(err => {
                console.log(err);
            });
    }
}