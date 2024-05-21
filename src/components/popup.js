import {
  EscKey,
  previewImageCloseButton,
  profileCloseButton,
} from "../utils/constants";
export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (e) => {
    if (e.key === EscKey) {
      this.close();
    }
  };
  _handleRemoteClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close(evt.currentTarget);
    }
  };
  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      this.open();
    });

    this._popupElement.addEventListener("click", (e) => {
      if (e.target === this._popupElement) {
        this.close();
      }
    });
  }
}
