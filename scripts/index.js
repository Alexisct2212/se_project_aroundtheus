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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileTitleInput = document.querySelector(".modal__input");
const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = document.querySelector(
  ".modal__input:last-of-type"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = document.querySelector(".add-modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardProfileCloseButton = addCardModal.querySelector(".modal__close");
const cardTitleInput = addCardFormElement.querySelector("#modal__input-title");
const cardUrlInput = addCardFormElement.querySelector("#modal__input-link");
//preview Image Modal part
const previewImageModalCard = document.querySelector(".preview__modal");
const previewImageCloseButton =
  previewImageModalCard.querySelector(".modal__close");
// preview Image Modal part
// Functions
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".block");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  // preview Image part
  const previewImageModal = document.querySelector(".preview__modal");
  const previewImageUrl = previewImageModal.querySelector(".preview__image");
  const previewImageDescription = previewImageModal.querySelector(
    ".preview__description-image"
  );
  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImageUrl.src = cardData.link;
    previewImageAlt.textContent = cardTitleEl.textContent;
    previewImageDescription.textContent = cardTitleEl.textContent;
  });
  // preview Image Part
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
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

// previe Image part
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

addNewCardButton.addEventListener("click", () =>
  addCardModal.classList.add("modal_opened")
);

addCardProfileCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

// Initialization
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset(addCardFormElement);
  closePopup(addCardModal);
}
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
