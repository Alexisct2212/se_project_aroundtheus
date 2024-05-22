import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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
  addCardModal,
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

function renderCard(cardData, wrapper) {
  const cardInstance = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData);
  });
  const cardElement = cardInstance.generateCard();
  wrapper.prepend(cardElement);
}

const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
};

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
editProfilePopup.setEventListeners();

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardFormElement.reset();
  closePopup(addCardModal);
}

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
addCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const popupWithImage = new PopupWithImage({
  popupSelector: ".preview__modal",
});
popupWithImage.setEventListeners();
addCardModal.addEventListener("click", () => {
  popupWithImage.open();
});
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

const userInfo = new UserInfo({
  profileTitle,
  profileDescription,
  profilePicture,
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  editProfilePopup.open();
});
