import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import "../pages/index.css";
import Popup from "../components/popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  formValidatorConfig,
  profileEditButton,
  profileEditModal,
  profileCloseButton,
  profileTitle,
  profileTitleInput,
  profileDescription,
  profileDescriptionInput,
  profileEditForm,
  addCardFormElement,
  cardListEl,
  cardTemplate,
  addNewCardButton,
  addCardModal,
  addCardProfileCloseButton,
  cardTitleInput,
  cardUrlInput,
  previewImageModalCard,
  previewImageCloseButton,
  EscKey,
  profilePicture,
} from "../utils/constants.js";

// Data

const initialCards = [
  {
    name: "Yosemite Valley",

    description: "Yosemite Valley",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",

    description: "Lake Louise",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",

    description: "Bald Mountains",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",

    description: "Latemar",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",

    description: "Vanoise National Park",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",

    description: "Lago di Braies",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// DOM Elements
// preview Image Modal part
// Functions
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("click", closeModalOnRemoteClick);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("click", closeModalOnRemoteClick);
}
function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
function closeModalByEscape(evt) {
  if (evt.key === "escape") {
    const openedModal = document.querySelector(".modal_opened");
    window.closePopup(openedModal);
  }
}
// card function imported
function renderCard(cardData, wrapper) {
  const cardInstance = new Card(cardData, "#card-template", openModal); // Use a different variable name for the instance
  const cardElement = cardInstance.generateCard(); // Call generateCard method on cardInstance
  wrapper.prepend(cardElement);
}
// Event Handlers
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
//preview Image part
previewImageCloseButton.addEventListener("click", () =>
  closePopup(previewImageModalCard)
);
// preview Image part
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});
addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardProfileCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);
//Initialization
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
//
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardFormElement.reset();
  closePopup(addCardModal);
}
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
//form Validator function

const profileEditFormValidator = new FormValidator(
  formValidatorConfig,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  formValidatorConfig,
  addCardFormElement
);
addCardFormValidator.enableValidation();
//popupWithForm
const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
newCardPopup.open();
newCardPopup.close();
//popupWithForm
