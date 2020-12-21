import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/initialCards.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const popupSelectors = {
    opened: 'popup_opened',
    closeSelector: '.popup__close',
    imageSelector: '.popup__image',
    captionSelector: '.popup__caption',
    inputSelector: '.popup__input',
    formSelector: '.popup__form'
}


const editButton = document.querySelector('.profile__btn_edit');
const addButton = document.querySelector('.profile__btn_add');
const gallery = document.querySelector('.cards-gallery');

const userInfo = new UserInfo({ userName: '.profile__title', userJob: '.profile__subtitle' });
const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#card', (evt) => {
            const popup = new PopupWithImage('.popup_type_image', popupSelectors);
            popup.open(evt.target.src,
                evt.target.closest('.card').querySelector('.card__heading').innerText);
            popup.setEventListeners();
        });
        section.addItem(card.generateCard());
    }
}, gallery);
section.renderItems();

const popupAddCard = new PopupWithForm('.popup_type_add-card', popupSelectors, function(evt, data) {
    evt.preventDefault();
    const cardConf = {
        name: data.popupPlace,
        link: data.popupLink
    };
    const card = new Card(cardConf, '#card', (evt) => {
        const popup = new PopupWithImage('.popup_type_image', popupSelectors);
        popup.open(evt.target.src,
            evt.target.closest('.card').querySelector('.card__heading').innerText);
    });
    section.addItem(card.generateCard());
    popupAddCard.close();
});
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_profile', popupSelectors, (evt, userData) => {
    evt.preventDefault();
    userInfo.setUserInfo(userData);
    popupEditProfile.close();
});
popupEditProfile.setEventListeners();

editButton.addEventListener('click', () => {
    popupEditProfile.open();
    const form = new FormValidator(validationSettings, document.querySelector('.popup_type_profile').querySelector('.popup__form'));
    form.enableValidation();
    form.resetValidation();
});

addButton.addEventListener('click', () => {
    popupAddCard.open();
    const form = new FormValidator(validationSettings, document.querySelector('.popup_type_add-card').querySelector('.popup__form'));
    form.enableValidation();
    form.resetValidation();
});