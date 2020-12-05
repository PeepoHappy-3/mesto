export class Card {
    constructor(card, templeteSelector, openImage) {
        this._name = card.name;
        this._link = card.link;
        this._element = this._getTemplate(templeteSelector);
        this._getCardElements();

        this._openImage = openImage;
    }
    _getTemplate(template) {
        return document.querySelector(template)
            .content
            .cloneNode(true);
    }
    _getCardElements() {
        this.cardImage = this._element.querySelector('.card__image');
        this.likeBtn = this._element.querySelector('.card__btn');
        this.deleteBtn = this._element.querySelector('.card__delete');
    }

    _setEventListeners() {
        this.likeBtn.addEventListener('click', function(evt) {
            evt.target.classList.toggle('card__btn_active');
        });
        this.deleteBtn.addEventListener('click', function(evt) {
            const deleteItem = evt.target.closest('.card');
            deleteItem.remove();
        });
        this.cardImage.addEventListener('click', (evt) => {
            this._openImage(evt);
        });
    }
    generateCard() {
        this.cardImage.src = this._link;
        this.cardImage.setAttribute('alt', this._name);
        this._element.querySelector('.card__heading').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }

}