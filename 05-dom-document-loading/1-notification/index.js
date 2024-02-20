export default class NotificationMessage {
  element;

  constructor(message, options) {
    this.message = message;
    this.duration = options.duration;
    this.type = options.type;
    this.element = this.createElement(this.createTemplate());
  }

  show(container = document.body) {
    if (NotificationMessage.lastInstance) {
      NotificationMessage.lastInstance.remove();
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








  show() {
    console.log("Show", this.duration);
    document.body.appendChild(this.element);
    // this.remove()
  }
  destroy() {
    this.remove();
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
    <div class="notification success" style="--value:${Number(this.duration/1000)}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">success</div>
      <div class="notification-body">
        Hello world
      </div>
    </div>
  </div>
       `);
  }
}
