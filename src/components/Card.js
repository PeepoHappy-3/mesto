export class Card {
    constructor(card, templeteSelector, openImage, openDeletePopup, api, id) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templeteSelector;
        this._likes = card.likes.length;
        this._id = card._id;
        this._cardOwnerId = card.owner._id;
        this._openImage = openImage;
        this._api = api;
        this._openDeletePopup = openDeletePopup;
        this._isLiked = card.likes.some((a) => {
            return a._id === id;
        });
        this._isOwner = id === this._cardOwnerId;
        this._toggleLike = this._toggleLike.bind(this);
    }
    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }
    _setEventListeners() {
        this._element.querySelector('.card__btn').addEventListener('click', () => {
            this._handleLikeBtn();
        });
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._handleDeleteBtn();
        });
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._openImage(this._name, this._link);
        });
    }

    _toggleLike(data) {
        this._likes = data.likes.length;
        this._renderLikes();
        this._element.querySelector('.card__btn').classList.toggle('card__btn_active');
        this._isLiked = !this._isLiked;
    }
    _handleLikeBtn() {
        if (!this._isLiked) {
            this._api.putLike(this._id, this._toggleLike);
        } else {
            this._api.deleteLike(this._id, this._toggleLike);
        }
    }
    _renderLikes() {
        const likes = this._element.querySelector('.card__like-count');
        likes.innerText = this._likes;
    }
    _handleDeleteBtn() {
        this._openDeletePopup(() => {
            this._api.deleteCard(this._id, this._element.remove());
        });
    }
    generateCard() {
        this._element = this._getTemplate();
        const image = this._element.querySelector('.card__image');
        image.src = this._link;
        image.setAttribute('alt', this._name);
        const heading = this._element.querySelector('.card__heading');
        heading.textContent = this._name;
        this._renderLikes();
        if (!this._isOwner) {
            this._element.querySelector('.card__delete').style.display = "none";
        }
        if (this._isLiked) {
            this._element.querySelector('.card__btn').classList.add('card__btn_active');
        }
        this._setEventListeners();
        return this._element;
    }
}