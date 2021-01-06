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
    formSelector: '.popup__form'
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

const formProfileValidator = new FormValidator(validationSettings, document.querySelector('.popup_type_profile').querySelector('.popup__form'));
const formAddCardValidator = new FormValidator(validationSettings, document.querySelector('.popup_type_add-card').querySelector('.popup__form'));
const formEditAvatarValidator = new FormValidator(validationSettings, document.querySelector('.popup_type_avatar').querySelector('.popup__form'));

const userInfo = new UserInfo({ profileName: '.profile__title', profileJob: '.profile__subtitle', profileAvatar: '.profile__photo' });

const api = new Api(options);

const section = new Section({
    renderer: (item) => {
        const card = new Card(item, '#card', {
                openImage: (name, link) => {
                    popupWithImage.open(link,
                        name);
                },
                deleteCard: (id, remove) => {
                    popupWithConfirm.setHandler((evt) => {
                        evt.preventDefault();
                        api.deleteCard(id, remove);
                        popupWithConfirm.close();
                    });
                    popupWithConfirm.open();
                    popupWithConfirm.setEventListeners();

                },
                putLike: (id, handler) => {
                    api.putLike(id, (data) => {
                        handler(data);
                    });
                },
                deleteLike: (id, handler) => {
                    api.deleteLike(id, (data) => {
                        handler(data);
                    });
                }
            },
            userInfo.getUserId()
        );
        section.prependItem(card.generateCard());
    }
}, gallery);

const popupAddCard = new PopupWithForm('.popup_type_add-card', popupSelectors, function(evt, data) {
    evt.preventDefault();
    api.postNewCard('cards', data, (data) => {
            const card = new Card(data, '#card', {
                    openImage: (name, link) => {
                        popupWithImage.open(link,
                            name);
                    },
                    deleteCard: (id, remove) => {
                        popupWithConfirm.setHandler((evt) => {
                            evt.preventDefault();
                            api.deleteCard(id, remove);
                            popupWithConfirm.close();
                        });
                        popupWithConfirm.open();
                        popupWithConfirm.setEventListeners();

                    },
                    putLike: (id, handler) => {
                        api.putLike(id, (data) => {
                            handler(data);
                        });
                    },
                    deleteLike: (id, handler) => {
                        api.deleteLike(id, (data) => {
                            handler(data);
                        });
                    }
                },
                userInfo.getUserId()
            );
            section.appendItem(card.generateCard());
        },
        (isLoading) => {
            if (isLoading) {
                document.querySelector('.popup_opened').querySelector('.popup__submit').innerText = 'Сохранение...'
            } else {
                document.querySelector('.popup_opened').querySelector('.popup__submit').innerText = 'Создать'
                popupAddCard.close();
            }
        });
});

const popupEditProfile = new PopupWithForm('.popup_type_profile', popupSelectors, (evt, userData) => {
    evt.preventDefault();
    api.setProfileInfo('users/me',
        userData, (data) => {
            userInfo.setUserInfo(data)
        }, (isLoading) => {
            if (isLoading) {
                document.querySelector('.popup_opened').querySelector('.popup__submit').innerText = 'Сохранение...'
            } else {
                document.querySelector('.popup_opened').querySelector('.popup__submit').innerText = 'Сохранить'
                popupEditProfile.close();
            }
        });
});

const popupWithAvatarForm = new PopupWithForm('.popup_type_avatar', popupSelectors, (evt, data) => {
    evt.preventDefault();
    api.setProfileInfo('users/me/avatar', data, (data) => {
        userInfo.setUserAvatar(data.avatar);
    }, (isLoading) => {
        if (isLoading) {
            document.querySelector('.popup_opened').querySelector('.popup__submit').innerText = 'Сохранение...'
        } else {
            document.querySelector('.popup_opened').querySelector('.popup__submit').innerText = 'Сохранить'
            popupWithAvatarForm.close();
        }
    });
});

popupAddCard.setEventListeners();

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupWithAvatarForm.setEventListeners();

api.getProfileInfo('users/me', (data) => {
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data.avatar);
}).then(() => {
    api.getInitialCards('cards', (data) => {
        section.renderItems(data);
    });
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