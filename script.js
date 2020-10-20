let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__btn_edit');
let closeButton = popup.querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__form');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let popupName = popup.querySelector('.popup__input_type_title');
let popupJob = popup.querySelector('.popup__input_type_subtitle');

editButton.addEventListener('click', function() {
    if (!popup.classList.contains('popup_opened')) {
        popup.classList.add('popup_opened');
        popupName.value = profileName.innerText;
        popupJob.value = profileJob.innerText;
    }
});
closeButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    profileName.innerText = popupName.value;
    profileJob.innerText = popupJob.value;
    closePopup();
});

function closePopup() {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
    }
}