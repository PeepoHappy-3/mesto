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
const cardTemplate = document.querySelector('#card').content;

const popupCard = document.querySelector('.popup_type_image');
const popupImage = popupCard.querySelector('.popup__image');
const popupCaption = popupCard.querySelector('.popup__caption');

function createCard(card) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__heading').textContent = card.name;
    cardImage.src = card.link;
    cardImage.setAttribute('alt', card.name);
    const likeBtn = cardElement.querySelector('.card__btn');
    const deleteBtn = cardElement.querySelector('.card__delete');
    likeBtn.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__btn_active');
    });
    deleteBtn.addEventListener('click', function(evt) {
        const deleteItem = evt.target.closest('.card');
        deleteItem.remove();
    });
    cardImage.addEventListener('click', function(evt) {
        openPopup(popupCard);
        popupImage.src = evt.target.src;
        popupCaption.innerText = evt.target.closest('.card').querySelector('.card__heading').innerText;
    });
    return cardElement;
}

function addCard(card) {
    gallery.prepend(card);
};

function initCards(cards) {
    cards.forEach(function(item) {
        addCard(createCard(item));
    });
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
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
    closePopup(evt.target.closest('.popup'));

}

function submitAddCard(evt) {
    evt.preventDefault();
    const name = popupPlace.value;
    const link = popupLink.value;
    addCard(createCard({ name, link }));
    closePopup(evt.target.closest('.popup'));
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
closeButtons.forEach(function(item) {
    item.addEventListener('click', function(evt) {
        closePopup(evt.target.closest('.popup'));
    });
});

editButton.addEventListener('click', function() {
    popupOpenProfile(popupProfile);
});
addButton.addEventListener('click', function() {
    popupPlace.value = '';
    popupLink.value = '';

    openPopup(popupAdd);
});
popupFormProfile.addEventListener('submit', function(evt) {
    submitProfile(evt);

});
popupFormAdd.addEventListener('submit', function(evt) {
    submitAddCard(evt);

});
initCards(initialCards);