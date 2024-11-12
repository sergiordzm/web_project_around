export default class Card {
    constructor(data, templateSelector, handleImageClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleImageClick = handleImageClick;
    }
  
    _getTemplate() {
      return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
    }
  
    _setEventListeners() {
      // Like button
      this._element.querySelector('.card__like-button').addEventListener('click', () => {
        this._handleLikeClick();
      });
  
      // Delete button
      this._element.querySelector('.card__delete-button').addEventListener('click', () => {
        this._handleDeleteClick();
      });
  
      // Image click
      this._cardImage.addEventListener('click', () => {
        this._handleImageClick(this._name, this._link);
      });
    }
  
    _handleLikeClick() {
      this._element
        .querySelector('.card__like-button')
        .classList.toggle('card__like-button_active');
    }
  
    _handleDeleteClick() {
      this._element.remove();
      this._element = null;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.card__photo');
      
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._element.querySelector('.card__info-name').textContent = this._name;
  
      this._setEventListeners();
  
      return this._element;
    }
  }