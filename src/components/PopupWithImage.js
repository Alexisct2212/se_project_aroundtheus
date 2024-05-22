import Popup from "../components/popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    // Use the correct selectors for the image and description elements
    this._previewImageUrl = this._popupElement.querySelector(".preview__image");
    this._previewImageDescription = this._popupElement.querySelector(
      ".preview__description-image"
    );
  }
  open(cardData) {
    // Set the src, alt, and textContent correctly
    this._previewImageUrl.src = cardData.link;
    this._previewImageUrl.alt = cardData.name;
    this._previewImageDescription.textContent = cardData.name;
    super.open();
  }
}
