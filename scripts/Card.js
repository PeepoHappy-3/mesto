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
            .cloneNode(true);
    }
    _setEventListeners() {
        this._element.querySelector('.card__btn').addEventListener('click', function(evt) {
            evt.target.classList.toggle('card__btn_active');
        });
        this._element.querySelector('.card__delete').addEventListener('click', function(evt) {
            evt.target.closest('.card').remove();
        });
        this._element.querySelector('.card__image').addEventListener('click', (evt) => {
            this._openImage(evt);
        });
    }
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').setAttribute('alt', this._name);
        this._element.querySelector('.card__heading').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}