//const { Card } = require("./Card");
import { Card } from './Card.js';

const popupProfile = document.querySelector('.popup.popup_type_profile');
const popupAdd = document.querySelector('.popup.popup_type_add-card');
const editButton = document.querySelector('.profile__btn_edit');
const addButton = document.querySelector('.profile__btn_add');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupName = popupProfile.querySelector('.popup__input_type_title');
const popupJob = popupProfile.querySelector('.popup__input_type_subtitle');
const popupPlace = popupAdd.querySelector('.popup__input_type_place');
const popupLink = popupAdd.querySelector('.popup__input_type_link');
const popupFormAdd = popupAdd.querySelector('.popup__form');
const popupFormProfile = popupProfile.querySelector('.popup__form');
const gallery = document.querySelector('.cards-gallery');
const closeButtons = document.querySelectorAll('.popup__close');


const popupCard = document.querySelector('.popup_type_image');
const popupImage = popupCard.querySelector('.popup__image');
const popupCaption = popupCard.querySelector('.popup__caption');


function openImagePopup(evt) {
    openPopup(popupCard);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.closest('.card').querySelector('.card__heading').innerText;
    popupCaption.innerText = evt.target.closest('.card').querySelector('.card__heading').innerText;
}

function addCard(card, cardContainer) {
    cardContainer.prepend(card);
};

function initCards(cards) {
    cards.forEach(function(item) {
        const card = new Card(item, '#card', openImagePopup);
        addCard(card.generateCard(), gallery);
    });
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    addEscListener();
    addOverlayListener(popup);
}

function popupOpenProfile(popup) {
    openPopup(popup);
    popupName.value = profileName.innerText;
    popupJob.value = profileJob.innerText;
}

function submitProfile(evt) {
    evt.preventDefault();
    profileName.innerText = popupName.value;
    profileJob.innerText = popupJob.value;
    closePopup(popupProfile);
}

function submitAddCard(evt) {
    evt.preventDefault();
    const name = popupPlace.value;
    const link = popupLink.value;
    addCard(createCard({ name, link }), gallery);
    closePopup(popupAdd);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeEscListener();
    removeOverlayListener(popup);
}

function addEscListener() {
    document.addEventListener('keyup', closeOnEsc);
}

function removeEscListener() {
    document.removeEventListener('keyup', closeOnEsc);
}

function closeOnEsc(evt) {
    if (evt.key == 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function closeOnOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function addOverlayListener(popup) {
    popup.addEventListener('click', closeOnOverlay);
}

function removeOverlayListener(popup) {
    popup.removeEventListener('click', closeOnOverlay);
}

closeButtons.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        closePopup(evt.target.closest('.popup'));
    });
});

editButton.addEventListener('click', function(evt) {
    popupOpenProfile(popupProfile);
    resetValidation(popupProfile.querySelector('.popup__form'), validationSettings);
});
addButton.addEventListener('click', function() {
    popupPlace.value = '';
    popupLink.value = '';
    openPopup(popupAdd);
    resetValidation(popupAdd.querySelector('.popup__form'), validationSettings);
});
popupFormProfile.addEventListener('submit', function(evt) {
    submitProfile(evt);

});
popupFormAdd.addEventListener('submit', function(evt) {
    submitAddCard(evt);

});
initCards(initialCards);