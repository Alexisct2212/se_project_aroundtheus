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
import PopupWithConfirmation from "../components/PopUpWithConfirmation.js";

// Data
const initialCards = [
  {
    name: "Yosemite Valley",
    description: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    _id: "card1",
  },
  {
    name: "Lake Louise",
    description: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    _id: "card12",
  },
  {
    name: "Bald Mountains",
    description: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    _id: "card123",
  },
  {
    name: "Latemar",
    description: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    _id: "card4",
  },
  {
    name: "Vanoise National Park",
    description: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    _id: "card5",
  },
  {
    name: "Lago di Braies",
    description: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    _id: "card6",
  },
];
//
// API initialization
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f10ef152-cb9d-40bf-b92c-7c27e5b2bf36",
    "Content-Type": "application/json",
  },
});

// User Info
const userInfo = new UserInfo({
  profileTitle: document.querySelector(".profile__title"),
  profileDescription: document.querySelector(".profile__description"),
  profilePicture: document.querySelector(".profile__image"),
});

// Form Validators
const profileEditFormValidator = new FormValidator(options, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(options, addCardFormElement);
addCardFormValidator.enableValidation();

const avatarEditFormValidator = new FormValidator(
  options,
  document.querySelector("#change__profile_picture")
);
avatarEditFormValidator.enableValidation();

// Image Popup
const popupWithImage = new PopupWithImage({
  popupSelector: ".preview__modal",
});
popupWithImage.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: "#delete__card-modal",
  handleFormSubmit: (cardId, cardElement) => {
    console.log(`Deleting card with cardId=${cardId}`);
    // Check if card ID is from a hardcoded card
    if (cardId.startsWith("card")) {
      console.warn("Cannot delete hardcoded initial card");
      cardElement.remove();
      deleteCardPopup.close();
      return;
    }

    // Proceed to delete card from server
    api
      .deleteCard(cardId)
      .then(() => {
        console.log("Card successfully deleted");
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error("Delete card error:", err);
      });
  },
});
deleteCardPopup.setEventListeners();

// Function to create card
const createCard = (cardData) => {
  const cardInstance = new Card(
    cardData,
    "#card-template",
    () => {
      popupWithImage.open(cardData);
    },
    (cardId, cardElement) => {
      deleteCardPopup.open(cardId, cardElement);
    },
    handleLikeButton,
    api
      .likeCard(cardData)
      .then(() => {
        console.log("like function is working ");
      })
      .catch((err) => {
        console.log("like function error is", err);
      })
  );
  return cardInstance.generateCard();
};

// Card Section initialization
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardElement.id = cardData._id; // Ensure each card has a unique id
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
      console.log("Profile Response:", res);
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.job;
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Profile update error:", err);
    });
};

const handleAddCardFormSubmit = (data) => {
  api
    .addCard(data.title, data.link)
    .then((res) => {
      const cardInstance = new Card(
        res,
        "#card-template",
        () => {
          popupWithImage.open(res);
        },
        (cardId, cardElement) => {
          deleteCardPopup.open(cardId, cardElement);
        }
      );
      const cardElement = cardInstance.generateCard();
      cardElement.id = res._id; // Ensure each card has a unique id
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Add card error:", err);
    });
};

const handleAvatarFormSubmit = (data) => {
  console.log("Update Avatar Data:", data);
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      console.log("Update Avatar Response:", res);
      userInfo.setAvatar(res.avatar); // Use the updated method name
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error("Avatar update error:", err);
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
});

//like function
function handleLikeButton(cardId, cardInstance) {
  console.log(`Toggling like for cardId: ${cardId}`);
  const isLiked = cardInstance._like; // Check current like status
  const toggleLike = isLiked
    ? api.unlikeCard(cardId) // Method for unliking a card
    : api.likeCard(cardId); // Method for liking a card

  toggleLike
    .then((updatedCardData) => {
      console.log(`Received updated like state: ${updatedCardData.isliked}`);
      cardInstance.handleLike(updatedCardData.isliked); // Update card state
    })
    .catch((err) => {
      console.error("Like toggle error:", err);
    });
}
