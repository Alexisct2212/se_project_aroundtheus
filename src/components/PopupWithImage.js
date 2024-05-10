import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link }) {
    const imagePopupElement = this._popupElement.querySelector(".card__image");
    const imagePopupCaption = this._popupElement.querySelector(".block");

    imagePopupElement.src = link;
    imagePopupCaption.textContent = name;
    imagePopupElement.alt = name;
    super.open();
  }
}
