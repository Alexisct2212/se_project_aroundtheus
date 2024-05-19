import Popup from "../components/popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(data) {
    const previewImageModal = document.querySelector(".preview__modal");
    const previewImageUrl = previewImageModal.querySelector(".preview__image");
    const previewImageDescription = previewImageModal.querySelector(
      ".preview__description-image"
    );
    previewImageUrl.src = data.link;
    previewImageUrl.alt = data.name;
    previewImageDescription.textContent = data.name;
    super.open();
  }
}
