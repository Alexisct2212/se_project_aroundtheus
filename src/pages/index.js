import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButton,
  profileTitle,
  profileTitleInput,
  profileDescription,
  profileDescriptionInput,
  profileEditForm,
  addCardFormElement,
  cardListEl,
  addNewCardButton,
  addCardModal,
  cardTitleInput,
  cardUrlInput,
  profilePicture,
  openModal,
  closePopup,
  options,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Popup from "../components/popup.js";

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
//API
const api = new Api({
  baseUrl: " https://around-api.en.tripleten-services.com",
  headers: {
    authorization: "be6d8597-bde7-4a38-a9e9-73e2c22d9b57",
    "Content-Type": "application/json",
  },
});
//
api.editProfile().then((cards) => {
  console.log(cards);
});
//
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardInstance = new Card(cardData, "#card-template", () => {
        popupWithImage.open(cardData);
      });
      const cardElement = cardInstance.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();
//
const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo({ name: data.name, job: data.job });
  editProfilePopup.close();
};

const handleAddCardFormSubmit = (data) => {
  const cardData = { name: data.title, link: data.link };
  const cardInstance = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData);
  });
  const cardElement = cardInstance.generateCard();
  cardSection.addItem(cardElement);
  addCardPopup.close();
};

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
});

const popupWithImage = new PopupWithImage({
  popupSelector: ".preview__modal",
});
popupWithImage.setEventListeners();

const profileEditFormValidator = new FormValidator(options, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(options, addCardFormElement);
addCardFormValidator.enableValidation();

const userInfo = new UserInfo({
  profileTitle,
  profileDescription,
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editProfilePopup.open();
});
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editProfilePopup.open();
}); //  edit profile picture
const editProfilePic = new PopupWithForm({
  popupSelector: "#change__profile_picture",
  handleFormSubmit: handleProfileFormSubmit,
});
editProfilePic.setEventListeners();
// delete card-modal
const deleteCardModal = new PopupWithForm({
  popupSelector: "#delete__card-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
deleteCardModal.setEventListeners();
// open new popups function
const avtarEditButton = document.querySelector(".profile__image-overlay");
const avatarEditForm = document.querySelector("#change__profile_picture");
const avatarLinkInput = document.querySelector("#modal__input-link");
avatarEditButton.addEventListener("click", () => {
  editProfilePic.open();
  avatarEditFormValidator.resetValidation();
});
