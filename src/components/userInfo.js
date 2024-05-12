import {
  profileTitle,
  profileDescription,
  profilePicture,
} from "../utils/constants.js";

export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._profileTitle = profileTitle;
    this._profileDescripion = profileDescription;
  }
  // Returns object with user info
  getUserInfo() {
    return {
      userName: this._userName,
      userJob: this._userJob,
      userAvatar: this._userAvatar,
      userId: this._userId,
    };
  }

  setUserInfo() {
    profileTitle.textContent = this._userName;
    profileDescription.textContent = this._userJob;
    profilePicture.src = this._userAvatar;
  }

  updateUserInfo(data) {
    this._userName = data.name;
    this._userJob = data.job;
  }

  setUserAvatar(imageLink) {
    this._userAvatar = imageLink;
  }
}
