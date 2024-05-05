export default class Card {
  constructor(cardData, templateSelector, openModalFunction) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._link = cardData.link;
    this._name = cardData.name;
    this._element = null;
    this._openModal = openModalFunction; // Reference to the openModal function
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    const cardElement = cardTemplate.content.cloneNode(true);
    return cardElement.querySelector(".card");
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    const cardImageEl = this._element.querySelector(".card__image");
    cardImageEl.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleDeleteCard() {
    this._element.remove(); // Remove the card element from the DOM
    this._element = null;
  }

  _handleImageClick() {
    const previewImageModal = document.querySelector(".preview__modal");
    const previewImageUrl = previewImageModal.querySelector(".preview__image");
    const previewImageDescription = previewImageModal.querySelector(
      ".preview__description-image"
    );

    this._openModal(previewImageModal); // Call openModal function
    previewImageUrl.src = this._cardData.link;
    previewImageUrl.alt = this._cardData.name;
    previewImageDescription.textContent = this._cardData.name;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImageEl = this._element.querySelector(".card__image");
    const cardTitleEl = this._element.querySelector(".block");

    cardImageEl.src = this._cardData.link;
    cardImageEl.alt = this._cardData.name;
    cardTitleEl.textContent = this._cardData.name;

    this._setEventListeners();

    return this._element;
  }
}