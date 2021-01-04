import { Popup } from '../components/Popup';

export class PopupWithConfirm extends Popup {
    constructor(selector, config) {
        super(selector, config);
        this._formSelector = config.formSelector;

    }
    open(handler) {
        super.open();
        this._handler = handler;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(this._formSelector).addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handler();
            this.close();
        });
    }
}