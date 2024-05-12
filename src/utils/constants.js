export const formValidatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileCloseButton =
  profileEditModal.querySelector(".modal__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileTitleInput = document.querySelector(".modal__input");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileDescriptionInput = document.querySelector(
  ".modal__input:last-of-type"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardFormElement = document.querySelector(".add-modal__form");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardProfileCloseButton =
  addCardModal.querySelector(".modal__close");
export const cardTitleInput =
  addCardFormElement.querySelector("#modal__input-text");
export const cardUrlInput =
  addCardFormElement.querySelector("#modal__input-link");
export const previewImageModalCard = document.querySelector(".preview__modal");
export const previewImageCloseButton =
  previewImageModalCard.querySelector(".modal__close");
export const EscKey = 27;
export const profilePicture = document.querySelector(".profile__image");
