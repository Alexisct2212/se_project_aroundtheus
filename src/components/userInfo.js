export default class UserInfo {
  constructor({ profileTitle, profileDescription, profilePicture }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
    this.profilePicture = profilePicture;
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      job: this._profileDescription.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._profileTitle.textContent = name;
    this._profileDescription.textContent = job;
  }
  setavatar(avatar) {
    this.profilePicture.src = avatar;
  }
}
