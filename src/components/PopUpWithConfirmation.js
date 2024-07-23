import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }
  setLoading(isLoading) {
    if (isLoading) {
      this._modalButton.textContent = "Deleting...";
    } else {
      this._modalButton.textContent = "Yes";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const cardId = this._popupElement.dataset.cardId;
      const cardElement = document.getElementById(cardId);
      this._handleFormSubmit(cardId, cardElement);
    });
  }

  open(cardId, cardElement) {
    this._popupElement.dataset.cardId = cardId;
    super.open();
  }
}
