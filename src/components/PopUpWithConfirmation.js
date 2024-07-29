import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
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

  setDeleting(isLoading) {
    if (isLoading) {
      this._modalButton.textContent = "Deleting...";
    } else {
      this._modalButton.textContent = "Yes";
    }
  }
}
