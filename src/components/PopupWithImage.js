import Popup from "../components/popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._previewImageUrl = this._popupElement.querySelector("preview__image");
    this._previewImageDescription = this._popupElement.querySelector(
      "preview__description-image"
    );
  }
  open({ name, link }) {
    this._previewImageUrl.src = link;
    this._previewImageUrl.alt = name;
    this._previewImageDescription.textContent = name;
    super.open();
  }
}
