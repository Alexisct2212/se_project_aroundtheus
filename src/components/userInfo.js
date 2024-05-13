import {
  profileTitle,
  profileDescription,
  profilePicture,
} from "../utils/constants.js";
export default class UserInfo {
  constructor({ titleElement, descriptionElement, pictureElement }) {
    this._profileTitleElement = titleElement;
    this._profileDescriptionElement = descriptionElement;
    this._profilePictureElement = pictureElement;
  }

  getUserInfo() {
    return {
      userName: this._profileTitleElement.textContent,
      userJob: this._profileDescriptionElement.textContent,
      userAvatar: this._profilePictureElement.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = job;
    this._profilePictureElement.src = avatar;
  }

  updateUserInfo({ name, job }) {
    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = job;
  }

  setUserAvatar(imageLink) {
    this._profilePictureElement.src = imageLink;
  }
}
