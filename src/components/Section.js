export class Section {
    constructor(data, selector) {
        this._items = data.items;
        this._renderer = data.renderer;
        this._selector = selector;
    }
    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
    appendItem(element) {
        this._selector.prepend(element);
    }
    prependItem(element) {
        this._selector.append(element);
    }
}