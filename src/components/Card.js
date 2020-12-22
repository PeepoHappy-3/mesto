export class Card {
    constructor(card, templeteSelector, openImage) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templeteSelector;
        this._openImage = openImage;
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

    _handleLikeBtn() {
        this._element.querySelector('.card__btn').classList.toggle('card__btn_active');
    }
    _handleDeleteBtn() {
        this._element.remove();
    }
    generateCard() {
        this._element = this._getTemplate();
        const image = this._element.querySelector('.card__image');
        image.src = this._link;
        image.setAttribute('alt', this._name);
        const heading = this._element.querySelector('.card__heading');
        heading.textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}