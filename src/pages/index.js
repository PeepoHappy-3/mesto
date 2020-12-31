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

const serverInfo = {
    token: 'aac4a60b-b09e-40d2-9391-f119b1a59443',
    profileLink: 'https://mesto.nomoreparties.co/v1/cohort-19/users/me'
}
const token = 'aac4a60b-b09e-40d2-9391-f119b1a59443';
const profileLink = 'https://mesto.nomoreparties.co/v1/cohort-19/users/me';

const editButton = document.querySelector('.profile__btn_edit');
const addButton = document.querySelector('.profile__btn_add');
const gallery = document.querySelector('.cards-gallery');

const popupWithImage = new PopupWithImage('.popup_type_image', popupSelectors);

const formProfileValidator = new FormValidator(validationSettings, document.querySelector('.popup_type_profile').querySelector('.popup__form'));
const formAddCardValidator = new FormValidator(validationSettings, document.querySelector('.popup_type_add-card').querySelector('.popup__form'));



const userInfo = new UserInfo({ name: '.profile__title', about: '.profile__subtitle', avatar: '.profile__photo' });
fetch(profileLink, {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(data => {
        userInfo.setUserInfo(data);
    });





const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#card', (name, link) => {
            popupWithImage.open(link,
                name);

        });
        section.pushItem(card.generateCard());
    }
}, gallery);
section.renderItems();
popupWithImage.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_add-card', popupSelectors, function(evt, data) {
    evt.preventDefault();
    const cardConf = {
        name: data.profilePlace,
        link: data.profileLink
    };
    const card = new Card(cardConf, '#card', (name, link) => {
        popupWithImage.open(link,
            name);
    });
    section.addItem(card.generateCard());
    popupAddCard.close();
});
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_profile', popupSelectors, (evt, userData) => {
    evt.preventDefault();
    // userInfo.setUserInfo(userData);
    fetch(profileLink, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            userData
        )
    });
    fetch(profileLink, {
            headers: {
                authorization: token
            }
        })
        .then(res => res.json())
        .then(data => {
            userInfo.setUserInfo(data);
        });
    popupEditProfile.close();
});

popupEditProfile.setEventListeners();

editButton.addEventListener('click', () => {
    popupEditProfile.open();
    popupEditProfile.setValues(userInfo.getUserInfo());
    formProfileValidator.enableValidation();
    formProfileValidator.resetValidation();
});

addButton.addEventListener('click', () => {
    popupAddCard.open();
    formAddCardValidator.enableValidation();
    formAddCardValidator.resetValidation();
});