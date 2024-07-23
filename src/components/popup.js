import { EscKey } from "../utils/constants";
export default class Popup {
  constructor({ popupSelector }) {
    console.log("popupSelector:", popupSelector); // Add this line
    this._popupElement = document.querySelector(popupSelector);
    if (!this._popupElement) {
      console.error(`Popup element with selector "${popupSelector}" not found`);
    }
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
    const closebutton = this._popupElement.querySelector(".modal__close");

    this._popupElement.addEventListener("click", (e) => {
      if (closebutton) {
        closebutton.addEventListener("click", () => this.close());
      }
    });
    this._popupElement.addEventListener("click", (e) => {
      if (e.target === this._popupElement) {
        this.close();
      }
    });
  }
}
