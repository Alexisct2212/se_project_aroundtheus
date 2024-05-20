import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import "../pages/index.css";
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
  addNewCardButton,
  cardTitleInput,
  cardUrlInput,
  profilePicture,
  openModal,
  closePopup,
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
const renderCard = (cardData) => {
  const cardInstance = new Card(cardData, "#card-template", handleCardClick);

  const cardElement = cardInstance.generateCard();

  cardSection.addItem(cardElement);
};

const cardSection = new Section(
  {
    items: initialCards,

    renderer: renderCard,
  },

  ".cards__list"
);

cardSection.renderItems();

// Handle card image click

const popupWithImage = new PopupWithImage({
  popupSelector: ".profile-edit-modal",
});

popupWithImage.setEventListeners();

function handleCardClick(cardData) {
  popupWithImage.open(cardData);
}

// Handle profile form submission

const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data);

  editProfilePopup.close();
};

const editProfilePopup = new PopupWithForm({
  popupSelector: ".profile-edit-modal",

  handleFormSubmit: handleProfileFormSubmit,
});

editProfilePopup.setEventListeners();

// Handle add card form submission

const handleAddCardFormSubmit = (data) => {
  const cardData = { name: data.title, link: data.link };

  const cardInstance = new Card(cardData, "#card-template", open);

  const cardElement = cardInstance.generateCard();

  cardSection.addItem(cardElement);

  addCardPopup.open();
};

const addCardPopup = new PopupWithForm({
  popupSelector: ".add-card-modal",

  handleFormSubmit: handleAddCardFormSubmit,
});

addCardPopup.setEventListeners();

// Add new card button handler

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

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

// UserInfo initialization

const userInfo = new UserInfo({
  profileTitle,

  profileDescription,

  profilePicture,
});

// Profile edit button handler

profileEditButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();

  profileTitleInput.value = userInfoData.title;

  profileDescriptionInput.value = userInfoData.description;

  editProfilePopup.open();
});
