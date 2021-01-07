import { Popup } from './Popup'
export class PopupWithImage extends Popup {
    constructor(selector, config) {
        super(selector, config);
        this._imageSelector = config.imageSelector;
        this._captionSelector = config.captionSelector;
        this._caption = this._popup.querySelector(this._captionSelector);
        this._popupImage = this._popup.querySelector(this._imageSelector);
    }
    open(src, alt) {
        super.open();
        this._popupImage.src = src;
        this._popupImage.alt = alt;
        this._caption.innerText = alt;
    }
}