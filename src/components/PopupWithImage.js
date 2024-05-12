import Popup from "../components/popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link }) {
    const imagePopupElement =
      this._popupElement.querySelector(".preview__image");
    const imagePopupCaption = this._popupElement.querySelector(
      ".preview__description-image"
    );

    imagePopupElement.src = link;
    imagePopupCaption.textContent = name;
    imagePopupElement.alt = name;
    super.open();
  }
}
