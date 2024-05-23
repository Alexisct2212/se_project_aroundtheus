export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      job: this._profileDescription.textContent,
    };
  }

  setUserInfo(cardData) {
    this._profileTitle.textContent = cardData.name;
    this._profileDescription.textContent = cardData.job;
  }
}
