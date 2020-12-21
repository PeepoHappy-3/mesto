export class Popup {
    constructor(selector, config) {
        this._popup = document.querySelector(selector);
        this._closeSelector = config.closeSelector;
        this._opened = config.opened;
    }
    open() {
        this._popup.classList.add(this._opened);
        document.addEventListener('keyup', this._handleEscClose.bind(this));
        //popup.addEventListener('click', closeOnOverlay);
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

export class PopupWithImage extends Popup {
    constructor(selector, config) {
        super(selector, config);
        this._imageSelector = config.imageSelector;
        this._captionSelector = config.captionSelector;
    }
    open(src, alt) {
        super.open();
        const popupImage = this._popup.querySelector(this._imageSelector);
        const popupCaption = this._popup.querySelector(this._captionSelector);
        popupImage.src = src;
        popupImage.alt = alt;
        popupCaption.innerText = alt;
    }
}


export class PopupWithForm extends Popup {
    constructor(selector, config, submitForm) {
        super(selector, config);
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitForm = submitForm;
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
        this._popup.querySelector(this._formSelector).addEventListener('submit',
            this._submitForm.bind(this._formSelector));
    }
}