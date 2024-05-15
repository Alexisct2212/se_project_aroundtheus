export default class Section {
  constructor({ items, renderer }, templateSelector) {
    this._items = items;
    this._renderer = renderer;

    // Select the container element using the selector
    this._container = document.querySelector(templateSelector);
  }

  // Correct method name to renderItems
  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    this._container.append(item);
  }
}
