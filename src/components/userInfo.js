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
    };
  }
  setUserInfo({ name, job }) {
    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = job;
  }
}
