export class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose.bind(this));
        //popup.addEventListener('click', closeOnOverlay);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose.bind(this));
    }
    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
        this._popup.querySelector('.popup__close').addEventListener('click', () => {

        });
    }
}