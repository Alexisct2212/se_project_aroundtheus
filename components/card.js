function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("click", closeModalOnRemoteClick);
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("click", closeModalOnRemoteClick);
}
function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    window.closePopup(openedModal);
  }
}
const previewImageModal = document.querySelector(".preview__modal");
const previewImageUrl = previewImageModal.querySelector(".preview__image");
const previewImageDescription = previewImageModal.querySelector(
  ".preview__description-image"
);
// open and close modal and image
export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    //
    this._handleImageClick = handleImageClick;
  }
  _setEventListener() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  _handleImageClick() {}

  _openModal() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _closeModal() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._modal.removeEventListener("click", this._handleOverlayClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._closeModal();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._modal) {
      this._closeModal();
    }
  }
  //
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    // set event listeners
    this._setEventListener;
    return this._cardElement;
  }

  generateCard() {
    this._cardElement = this._getView();
    this._setEventListener();
    this._element,
      (querySelector(
        ".card__image"
      ).style.backgroundImage = `url(${this.link})`);
    this._element.querySelector(".block").textContent = this.name;
    return this._element;
  }
}
