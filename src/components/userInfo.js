export default class UserInfo {
  constructor({ profileTitle, profileDescription, profilePicture }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
    this._profilePicture = profilePicture;
  }

  setUserInfo({ name, job, avatar }) {
    this._profileTitle.textContent = name;
    this._profileDescription.textContent = job;
    this._profilePicture.src = avatar;
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileDescription.textContent,
    };
  }

  setAvatar(avatarUrl) {
    // Ensure consistent method name
    this._profilePicture.src = avatarUrl;
  }
}
