export class Section {
    constructor(data, selector) {
        this._items = data.items;
        this._renderer = data.renderer;
        this._selector = selector;
    }
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._selector.prepend(element);
    }
    pushItem(element) {
        this._selector.append(element);
    }
}