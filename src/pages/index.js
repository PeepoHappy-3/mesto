import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api';

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
    formSelector: '.popup__form',
    submitSelector: '.popup__submit'
}

const options = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/',
    token: 'aac4a60b-b09e-40d2-9391-f119b1a59443'
}

const editButton = document.querySelector('.profile__btn_edit');
const addButton = document.querySelector('.profile__btn_add');
const editAvatar = document.querySelector('.profile__overlay');
const gallery = document.querySelector('.cards-gallery');

const popupWithImage = new PopupWithImage('.popup_type_image', popupSelectors);
const popupWithConfirm = new PopupWithForm('.popup_type_confirm', popupSelectors);

const profileForm = document.querySelector('.popup_type_profile').querySelector('.popup__form');
const addCardForm = document.querySelector('.popup_type_add-card').querySelector('.popup__form');
const editAvatarForm = document.querySelector('.popup_type_avatar').querySelector('.popup__form');
const formProfileValidator = new FormValidator(validationSettings, profileForm);
const formAddCardValidator = new FormValidator(validationSettings, addCardForm);
const formEditAvatarValidator = new FormValidator(validationSettings, editAvatarForm);

const userInfo = new UserInfo({ profileName: '.profile__title', profileJob: '.profile__subtitle', profileAvatar: '.profile__photo' });

const cardHandlers = {
    openImage: (name, link) => {
        popupWithImage.open(link,
            name);
    },
    deleteCard: (id, remove) => {
        popupWithConfirm.setHandler((evt) => {
            evt.preventDefault();
            api.deleteCard(id).then(() => {
                remove();
                popupWithConfirm.close();
            }).catch(err => {
                console.log(err);
            });
        });
        popupWithConfirm.open();
    },
    putLike: (id, handler) => {
        api.putLike(id).then((data) => {
            handler(data);
        }).catch(err => {
            console.log(err);
        });
    },
    deleteLike: (id, handler) => {
        api.deleteLike(id).then((data) => {
            handler(data);
        }).catch(err => {
            console.log(err);
        });
    }
}
const createNewCard = (item, isArray) => {
    const card = new Card(item, '#card', cardHandlers,
        userInfo.getUserId()
    );
    section.addItem(card.generateCard(), isArray);
}

const api = new Api(options);

const section = new Section({
        renderer: (item) => { createNewCard(item, true) }
    },
    gallery);

const popupAddCard = new PopupWithForm('.popup_type_add-card', popupSelectors, function(evt, data) {
    evt.preventDefault();
    popupAddCard.renderLoading(true);
    api.postNewCard(data).then((res) => {
        createNewCard(res, false);
        popupAddCard.close();
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        popupAddCard.renderLoading(false);
    });
})



const popupEditProfile = new PopupWithForm('.popup_type_profile', popupSelectors, (evt, userData) => {
    evt.preventDefault();
    popupEditProfile.renderLoading(true);
    api.setProfileInfo(userData).then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        popupEditProfile.renderLoading(false);
    })
});

const popupWithAvatarForm = new PopupWithForm('.popup_type_avatar', popupSelectors, (evt, data) => {
    evt.preventDefault();
    popupWithAvatarForm.renderLoading(true);
    api.setProfileAvatar(data).then((data) => {
        userInfo.setUserAvatar(data.avatar);
        popupWithAvatarForm.close();
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        popupWithAvatarForm.renderLoading(false);
    });
});

popupAddCard.setEventListeners();
popupWithConfirm.setEventListeners();
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupWithAvatarForm.setEventListeners();


Promise.all([
    api.getProfileInfo(), api.getInitialCards()
]).then((values) => {
    const [userData, initialCards] = values;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    section.renderItems(initialCards);
})


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

editAvatar.addEventListener('click', () => {
    popupWithAvatarForm.open();
    formEditAvatarValidator.enableValidation();
    formEditAvatarValidator.resetValidation();
})