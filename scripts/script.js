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
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__btn_edit');
const closeButton = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupName = popup.querySelector('.popup__input_type_title');
const popupJob = popup.querySelector('.popup__input_type_subtitle');


function renderCard(card) {
    const gallery = document.querySelector('.cards-gallery');
    const cardTemplate = document.querySelector('#card').content;
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


function openPopup() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.innerText;
    popupJob.value = profileJob.innerText;
}

function popupSubmit(e) {
    e.preventDefault();
    profileName.innerText = popupName.value;
    profileJob.innerText = popupJob.value;
    closePopup();
}

function closePopup() {
    popup.classList.remove('popup_opened');
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', popupSubmit);

initCards(initialCards);