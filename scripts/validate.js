const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function isValid(formElement, inputElement, errorClass, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showError(errorElement, inputElement, errorClass, inputErrorClass);
    } else {
        hideError(errorElement, inputElement, errorClass, inputErrorClass);
    }
}

function setEventListeners(formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    toggleButton(formElement, submitButtonSelector, inputList);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, errorClass, inputErrorClass);
            toggleButton(formElement, submitButtonSelector, inputList);
        });
    });
}

function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClass
}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector);
    });
}

function toggleButton(formElement, submitButtonSelector, inputList) {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.removeAttribute('disabled');
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
}

function showError(errorElement, inputElement, errorClass, inputErrorClass) {
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass);
}

function hideError(errorElement, inputElement, errorClass, inputErrorClass) {
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(inputErrorClass);
}

function resetValidation(formElement, {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClass
}) {
    //const formElement = document.querySelector(formSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        if (inputElement.classList.contains(inputErrorClass)) {
            inputElement.classList.remove(inputErrorClass);
        }
        if (errorElement.classList.contains(errorClass)) {
            errorElement.classList.remove(errorClass)
        }
        buttonElement.setAttribute('disabled', true);
    });
}
enableValidation(validationSettings);