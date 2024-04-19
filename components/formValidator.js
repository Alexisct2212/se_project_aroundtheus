export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }
  _showInputError(inputEl) {
    const errorMessageEl = formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
      return;
    }
    this._hideInputError(inputEl);
  }
  _toggleButtonState(inputEls, submitButton) {
    if (this._hasInvalidInput(inputEls)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }
  _setEventListener() {
    const inputEls = [...formEl.querySelectorAll(this._inputSelector)];
    const submitButton = formEl.querySelector(this._submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        toggleButtonState(inputEls, submitButton);
      });
    });
  }

  enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      _setEventListener();
    });
  }
}
