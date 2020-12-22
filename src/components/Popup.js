export class Popup {
    constructor(selector, config) {
        this._popup = document.querySelector(selector);
        this._closeSelector = config.closeSelector;
        this._opened = config.opened;
    }
    open() {
        this._popup.classList.add(this._opened);
        document.addEventListener('keyup', this._handleEscClose.bind(this));
    }
    close() {
        this._popup.classList.remove(this._opened);
        document.removeEventListener('keyup', this._handleEscClose.bind(this));
    }
    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose(evt) {
        if (evt.target.classList.contains(this._opened)) {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
        this._popup.querySelector(this._closeSelector).addEventListener('click', () => {
            this.close();
        });
    }
}