import {
  profileTitle,
  profileDescription,
  profilePicture,
} from "../utils/constants.js";
export default class UserInfo {
  constructor({ profileTitle, profileDescription, profilePicture }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
    this._profilePicture = profilePicture;
  }

  getUserInfo() {
    return {
      userName: this._profileTitle.textContent,
      userJob: this._profileDescription.textContent,
      userAvatar: this._profilePicture.src,
    };
  }
}
