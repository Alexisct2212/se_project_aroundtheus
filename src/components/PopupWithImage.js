import Popup from "../components/popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._data = data;
  }

  open(data) {
    const previewImageModal = document.querySelector(".preview__modal");
    const previewImageUrl = previewImageModal.querySelector(".preview__image");
    const previewImageDescription = previewImageModal.querySelector(
      ".preview__description-image"
    );
    this._openModal(previewImageModal); // Call openModal function
    previewImageUrl.src = data.link;
    previewImageUrl.alt = data.name;
    previewImageDescription.textContent = data.name;
    super.open();
  }
}
