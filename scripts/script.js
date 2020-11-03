const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
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
const gallery = document.querySelector('.cards-gallery');
const cardTemplate = document.querySelector('#card').content;

function renderCard(card) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__heading').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    gallery.append(cardElement);
}

function initCards(cards) {
    cards.forEach(function(item) {
        renderCard(item);
    });
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
    if (popup.classList.contains('popup_type_profile')) {
        popupName.value = profileName.innerText;
        popupJob.value = profileJob.innerText;
    }
}

function popupSubmitProfile(e) {
    e.preventDefault();
    profileName.innerText = popupName.value;
    profileJob.innerText = popupJob.value;

}

function popupSubmitAdd(e) {
    e.preventDefault();
    const name = popupPlace.value;
    const link = popupLink.value;
    renderCard({ name, link });
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', function() {
    const closeButton = popupProfile.querySelector('.popup__close');
    openPopup(popupProfile);
    closeButton.addEventListener('click', function() {
        closePopup(popupProfile);
    });
    const popupForm = popupProfile.querySelector('.popup__form');
    popupForm.addEventListener('submit', function(evt) {
        popupSubmitProfile(evt);
        closePopup(popupProfile);
    });
});
addButton.addEventListener('click', function() {
    const closeButton = popupAdd.querySelector('.popup__close');
    openPopup(popupAdd);
    closeButton.addEventListener('click', function() {
        closePopup(popupAdd);
    });
    const popupForm = popupAdd.querySelector('.popup__form');
    popupForm.addEventListener('submit', function(evt) {
        popupSubmitAdd(evt);
        closePopup(popupAdd);
    });
});
initCards(initialCards);