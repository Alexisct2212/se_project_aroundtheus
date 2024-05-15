import Popup from "../components/popup.js";
import { cardUrlInput, profileTitle } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(templateSelector) {
    super(templateSelector);
  }

  open(data) {
    const imagePopupElement =
      this._popupElement.querySelector(".preview__image");
    const imagePopupCaption = this._popupElement.querySelector(
      ".preview__description-image"
    );

    imagePopupElement.src = cardUrlInput.data;
    imagePopupCaption.textContent = profileTitle.data;
    imagePopupElement.alt = profileTitle.data;
    super.open();
  }
}
