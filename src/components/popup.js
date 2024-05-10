import { EscKey } from "../utils/constants";
export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {}
  close() {}
  _handldeEscClose() {}
  setEventListeners() {}
}
