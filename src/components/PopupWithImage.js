import { Popup } from './Popup'
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