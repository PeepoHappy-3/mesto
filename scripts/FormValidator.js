const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export class FormValidator {
    constructor(settings, form) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._form = form;
    }
    _isValid(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showError(errorElement, inputElement, this._errorClass, this._inputErrorClass);
        } else {
            this._hideError(errorElement, inputElement, this._errorClass, this._inputErrorClass);
        }
    }

    _showError(errorElement, inputElement) {
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideError(errorElement, inputElement) {
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        });
    }
    _toggleButton(formElement, inputList) {
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._toggleButton(formElement, inputList);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement);
                this._toggleButton(formElement, inputList);
            });
        });
    }
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            this._setEventListeners(formElement);
        });
    }
    resetValidation() {
        if (this._form) {
            const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
            const buttonElement = this._form.querySelector(this._submitButtonSelector);
            inputList.forEach((inputElement) => {
                const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
                inputElement.classList.remove(this._inputErrorClass);
                errorElement.classList.remove(this._errorClass);
                buttonElement.setAttribute('disabled', true);
            });
        }

    }
}