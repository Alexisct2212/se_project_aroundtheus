import Popup from "../components/popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._previewImageUrl = this._popupElement.querySelector(".preview__image");
    this._previewImageDescription = this._popupElement.querySelector(
      ".preview__description-image"
    );
  }

  open(cardData) {
    this._previewImageUrl.src = cardData.link;
    this._previewImageUrl.alt = cardData.name;
    this._previewImageDescription.textContent = cardData.name;
    super.open();
  }
}
