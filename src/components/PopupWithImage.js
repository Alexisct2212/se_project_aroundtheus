import Popup from "../components/popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupElement = document.querySelector(popupSelector);
    this._previewImageUrl = this._popupElement.querySelector(".preview__image");
    this._previewImageDescription = this._popupElement.querySelector(
      ".preview__description-image"
    );
  }
  open(data) {
    previewImageUrl.src = data.link;
    previewImageUrl.alt = data.name;
    previewImageDescription.textContent = data.name;
    super.open({ popupSelector });
  }
}
