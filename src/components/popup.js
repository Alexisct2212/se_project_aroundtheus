import { EscKey } from "../utils/constants";
export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open(e) {
    this._popupElement.classList.add("modal__opened");
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e.key);
    });
    // e.target.removeEventListener("keydown", this._handleEscClose);
  }

  //Close the popup
  close() {
    this._popupElement.classList.remove("modal__opened");
  }
  _handldeEscClose() {}
  setEventListeners() {}
}
