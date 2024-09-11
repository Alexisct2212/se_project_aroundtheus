export default class Section {
  constructor({ renderer }, containerSelector) {
    //this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  addItem(element, position = "append") {
    if (position === "prepend") {
      this._container.prepend(element); // Prepend the item
    } else {
      this._container.append(element); // Append the item
    }
  }
}
