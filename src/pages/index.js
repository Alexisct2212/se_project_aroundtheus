import Card from "../components/Card.js";
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
  profileAvatarEditButton,
  options,
} from "../utils/constants.js";
import Api from "../components/Api.js";

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
//
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com",
  headers: {
    authorization: "be6d8597-bde7-4a38-a9e9-73e2c22d9b57",
    "Content-Type": "application/json",
  },
});

// User Info
const userInfo = new UserInfo({
  profileTitle,
  profileDescription,
  profilePicture,
});

// Form Validators
const profileEditFormValidator = new FormValidator(options, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(options, addCardFormElement);
addCardFormValidator.enableValidation();

const avatarEditFormValidator = new FormValidator(
  options,
  document.querySelector("#change__profile_picture form")
);
avatarEditFormValidator.enableValidation();

// Image Popup
const popupWithImage = new PopupWithImage({
  popupSelector: ".preview__modal",
});
popupWithImage.setEventListeners();

// Card Section
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

// Form Handlers
const handleProfileFormSubmit = (data) => {
  api
    .editProfile(data.name, data.job)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.about });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleAddCardFormSubmit = (data) => {
  api
    .addCard(data.title, data.link)
    .then((res) => {
      const cardInstance = new Card(res, "#card-template", () => {
        popupWithImage.open(res);
      });
      const cardElement = cardInstance.generateCard();
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleAvatarFormSubmit = (data) => {
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Popup Modals
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

const editAvatarPopup = new PopupWithForm({
  popupSelector: "#change__profile_picture",
  handleFormSubmit: handleAvatarFormSubmit,
});
editAvatarPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editProfilePopup.open();
});

profileAvatarEditButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarEditFormValidator.resetValidation();
});
