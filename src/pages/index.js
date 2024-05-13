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

// card function imported
function renderCard(cardData, wrapper) {
  const cardInstance = new Card(cardData, "#card-template");
  const cardElement = cardInstance.generateCard();
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

previewImageCloseButton.addEventListener("click", () =>
  closePopup(previewImageModalCard)
);

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

// Initialization
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// Function to handle form submission
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardFormElement.reset();
  closePopup(addCardModal);
}

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Form Validator initialization
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

// PopupWithForm initialization
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: () => {}, // Define your handleFormSubmit function here
});
newCardPopup.setEventListeners();

// PopupWithImage initialization
const popupWithImage = new PopupWithImage(previewImageModalCard);
popupWithImage.setEventListeners();

// Popup initialization
const popup = new Popup();

// UserInfo initialization
const userInfo = new UserInfo({
  profileTitle,
  profileDescription,
  profilePicture,
});

// Opening the popup
popup.open();
// Closing the popup
popup.close();
