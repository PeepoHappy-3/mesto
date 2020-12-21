import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(selector, config, submitForm) {
        super(selector, config);
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitForm = submitForm;
    }
    close() {
        super.close();
        this._popup.querySelector(this._formSelector).reset();
    }
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll(this._inputSelector);
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(this._formSelector).addEventListener('submit', (evt) => {
            this._submitForm(evt, this._getInputValues());
        });
    }
}