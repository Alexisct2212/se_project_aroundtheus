export default class UserInfo {
  constructor({ profileTitle, profileDescription, profilePicture }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
    this._profilePicture = profilePicture;
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      job: this._profileDescription.textContent,
      avatar: this._profilePicture.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._profileTitle.textContent = name;
    this._profileDescription.textContent = job;
    this.setAvatar(avatar);
  }

  setAvatar(avatar) {
    this._profilePicture.src = avatar;
  }
}
