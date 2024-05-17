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
  profileTitle,
  profileTitleInput,
  profileDescription,
  profileDescriptionInput,
  profileEditForm,
  addCardFormElement,
  cardListEl,
  cardTemplate,
  addNewCardButton,
  cardTitleInput,
  cardUrlInput,
  previewImageModalCard,
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

// Section initialization
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      renderCard(cardData, cardListEl);
    },
  },
  "#card-list"
);
cardSection.renderItems();

// Card rendering function
function renderCard(cardData, wrapper) {
  const cardInstance = new Card(cardData, "#card-template", open);
  const cardElement = cardInstance.generateCard();
  wrapper.prepend(cardElement);
}

// Handle profile form submission
const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
};

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
editProfilePopup.open();
editProfilePopup.close();
editProfilePopup.setEventListeners();
// Handle add card form submission
const handleAddCardFormSubmit = (data) => {
  renderCard({ name: data.title, link: data.link }, cardListEl);
  addCardPopup.close();
};
const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardPopup.open();
addCardPopup.close();
addCardPopup.setEventListeners();
// Add new card button handler
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
// PopupWithImage initialization
const popupWithImage = new PopupWithImage(previewImageModalCard);

popupWithImage.setEventListeners();
//
const userInfo = new UserInfo({
  profileTitle,
  profileDescription,
  profilePicture,
});
// Form Validator initialization
const profileEditFormValidator = new FormValidator(
  profileEditForm,
  formValidatorConfig
);
profileEditFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(
  addCardFormElement,
  formValidatorConfig
);
addCardFormValidator.enableValidation();
// UserInfo initialization
