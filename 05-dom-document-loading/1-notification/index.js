export default class NotificationMessage {
  element;
  static #lastInstance;

  constructor(message, options = {}) {
    this.message = message;
    this.duration = options.duration || 1000;
    this.type = options.type || 'sucess';
    this.element = this.createElement(this.createTemplate());
  }

  show(container = document.body) {
    if (NotificationMessage.lastInstance) {
      NotificationMessage.lastInstance.destroy();
    }

    NotificationMessage.#lastInstance = this;

    container.append(this.element);

    this.timertId = setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  destroy() {
    this.remove();
    if (this.timertId) {
      clearTimeout(this.timertId);
    }
  }

  remove() {
    this.element.remove();
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    return (`
    <div class="notification ${this.type}" style="--value:${Number(this.duration / 1000)}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>
       `);
  }
}
