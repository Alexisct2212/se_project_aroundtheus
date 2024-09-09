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
  addNewCardButton,
  profileAvatarEditButton,
  options,
  initialCards,
  profilePicture,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopUpWithConfirmation.js";
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
    // Proceed to delete card from server
    deleteCardPopup.setDeleteState(true);
    api
      .deleteCard(cardId)
      .then(() => {
        console.log("Card successfully deleted");
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error("Delete card error:", err);
      })
      .finally(() => {
        // Reset the loading state regardless of success or error
        deleteCardPopup.setDeleteState(false);
      });
  },
});
deleteCardPopup.setEventListeners();
// Function to create card
const createCard = (cardData) => {
  return new Card(
    cardData,
    "#card-template",
    () => {
      popupWithImage.open(cardData);
    },
    (cardId, cardElement) => {
      deleteCardPopup.open(cardId, cardElement);
    },
    handleLikeButton
  ).generateCard();
};
//
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
api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error fetching initial cards:", err);
  });
// Form Handlers
const handleProfileFormSubmit = (data) => {
  editProfilePopup.setLoadingState(false); // Start loading state
  api
    .editProfile(data.name, data.job)
    .then((res) => {
      const updatedUserData = {
        name: data.name,
        job: data.job,
        avatar: userInfo.getUserInfo().avatar, // Retain the avatar
      };
      userInfo.setUserInfo(updatedUserData);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Profile update error:", err);
    })
    .finally(() => {
      editProfilePopup.setLoadingState(true); // End loading state
    });
};
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about, // Ensure this maps correctly to the job field
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.error("Error fetching user info:", err);
  });
// server for the profile changes
const handleAddCardFormSubmit = (data) => {
  addCardPopup.setLoadingState(false);
  api
    .addCard(data.title, data.link)
    .then((res) => {
      const cardElement = createCard(res);
      cardElement.id = res._id; // Ensure each card has a unique id
      cardSection.addItem(cardElement, "prepend");
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Add card error:", err);
    })
    .finally(() => {
      addCardPopup.setLoadingState(true); // End loading state
    });
};

const handleAvatarFormSubmit = (data) => {
  editAvatarPopup.setLoadingState(false);
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      console.log("Update Avatar Response:", res);
      userInfo.setAvatar(res.avatar); // Use the updated method name
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error("Avatar update error:", err);
    })
    .finally(() => {
      editAvatarPopup.setLoadingState(true); // End loading state
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
  avatarEditFormValidator.toggleButtonState();
});

//like function
const handleLikeButton = (cardId, cardInstance) => {
  const isLiked = cardInstance._like;
  const toggleLike = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
  toggleLike
    .then((updatedCardData) => {
      console.log("Toggling like for cardId:", cardId);
      console.log("Before toggle, isLiked:", isLiked);
      cardInstance.handleLike(!isLiked); // Toggle like status
    })
    .catch((err) => {
      console.error("Like toggle error:", err);
    });
};
