import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button"); // Add reference to the submit button
    this._defaultButtonText = this._submitButton
      ? this._submitButton.textContent
      : "";
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const cardId = this._popupElement.dataset.cardId;
      const cardElement = document.getElementById(cardId);
      if (cardId && cardElement) {
        this._handleFormSubmit(cardId, cardElement);
      } else {
        console.error("Missing cardId or cardElement");
      }
    });
  }

  open(cardId, cardElement) {
    console.log(`Opening delete confirmation for cardId=${cardId}`);
    this._popupElement.dataset.cardId = cardId;
    super.open();
  }

  setDeleteState(isLoading) {
    if (this._submitButton) {
      // Check if submit button is available
      this._submitButton.textContent = isLoading
        ? "Deleting..."
        : this._defaultButtonText;
    }
  }
}
