import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(selector, config, submitForm) {
        super(selector, config);
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitForm = submitForm;
        this._submitButton = this._popup.querySelector(config.submitSelector);
        this._form = this._popup.querySelector(this._formSelector);
    }
    close() {
        super.close();
        this._form.reset();
    }
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll(this._inputSelector);
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value.trim();
        });
        return this._formValues;
    }
    setValues(values) {
        this._inputList = this._popup.querySelectorAll(this._inputSelector);
        this._inputList.forEach(input => {
            input.value = values[input.name];
        });
    }
    setHandler(handler) {
        this._submitForm = handler;
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.innerText = 'Сохранение...'
        } else {
            this._submitButton.innerText = 'Сохранить'
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            this._submitForm(evt, this._getInputValues());
        });
    }
}