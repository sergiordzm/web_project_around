import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';


const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

// Elementos DOM
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editPopupElement = document.querySelector('.popup');
const addImagePopupElement = document.querySelector('#add-image-popup');
const popupImageOpen = document.querySelector('#popup_image-open');

const formElement = document.querySelector('.popup__form');
const formCard = document.querySelector('#add-image-popup .popup__form');
const nameInput = document.querySelector('.popup__input_name');
const aboutInput = document.querySelector('.popup__input_about');
const titleInput = document.querySelector('.popup__input_title');
const imageInput = document.querySelector('#popup__input_image');

const cardArea = document.querySelector('.cards');


const editFormValidator = new FormValidator(validationConfig, formElement);
const addCardFormValidator = new FormValidator(validationConfig, formCard);


editFormValidator.enableValidation();
addCardFormValidator.enableValidation();


function createCard(data) {
  const card = new Card(data, '.template-card', handleOpenImage);
  return card.generateCard();
}


function handleEditProfileClick() {
  nameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  editFormValidator.resetValidation();
  openPopup(editPopupElement);
}

function handleAddCardClick() {
  formCard.reset();
  addCardFormValidator.resetValidation();
  openPopup(addImagePopupElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;
  closePopup(editPopupElement);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: titleInput.value,
    link: imageInput.value
  });
  cardArea.prepend(newCard);
  closePopup(addImagePopupElement);
  evt.target.reset();
}

function handleOpenImage(name, link) {
  const popupImage = popupImageOpen.querySelector('.popup__image');
  const popupImageTitle = popupImageOpen.querySelector('.popup__image-title');
  
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
  
  openPopup(popupImageOpen);
}


profileEditButton.addEventListener('click', handleEditProfileClick);
profileAddButton.addEventListener('click', handleAddCardClick);
formElement.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleAddCardFormSubmit);


document.querySelectorAll('.popup__overlay').forEach((overlay) => {
  const popup = overlay.closest('.popup');
  overlay.addEventListener('click', () => closePopup(popup));
});


document.querySelectorAll('.popup__close-button').forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


initialCards.forEach((item) => {
  const card = createCard(item);
  cardArea.append(card);
});