export default class Card {
  constructor(
    cardData,
    templateSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeButton
  ) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._link = cardData.link;
    this._name = cardData.name;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._isLiked = cardData.isLiked || false; // Check if the card is liked
    this._handleImageClick = handleImageClick;
    this._handleLikeButton = handleLikeButton;
    this._handleDeleteCard = handleDeleteCard;
    this._element = null;
    this._likeButton = null;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    const cardElement = cardTemplate.content
      .cloneNode(true)
      .querySelector(".card");
    return cardElement;
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  toggleLike() {
    this._isLiked = !this._isLiked;
    this._handleLikeIcon();
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this._cardId, this);
    });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._cardId, this._element);
      });

    const cardImageEl = this._element.querySelector(".card__image");
    cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._cardData);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImageEl = this._element.querySelector(".card__image");
    const cardTitleEl = this._element.querySelector(".block");

    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;

    this._setEventListeners();
    this._handleLikeIcon();

    return this._element;
  }
}
