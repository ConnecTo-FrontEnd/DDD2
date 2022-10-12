import { render, eventHolder } from './render/index.js';

class Component {
  constructor(props) {
    this.state = {};
    this.props = props;
    this.uuid = this.constructor.name + '-' + self.crypto.randomUUID().slice(0, 8);
    this.holdEvents();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    render(this, document.querySelector(`[data-uuid='${this.uuid}']`));
  }

  uuidAdder(domStr, uuid) {
    const firstTag = /<.*>/;
    return domStr.replace(firstTag, tag => tag.split('>')[0] + ` data-uuid="${uuid}">`);
  }

  converter(selector) {
    return Object.entries(selector)
      .map(([property, value]) => `${property}: ${value}`)
      .join(';');
  }

  holdEvents() {
    const events = this.addEventListener?.();
    if (!events) return;

    for (const event of events) {
      if (event.selector === 'window' || event.selector === null) {
        eventHolder.push({ ...event, uuid: this.uuid });
        continue;
      }
      const { selector, handler } = event;

      event.handler = e => {
        if (e.target.closest(`[data-uuid='${this.uuid}']`) && e.target.closest(selector)) {
          handler(e);
        }
      };

      eventHolder.push({ ...event, uuid: this.uuid });
    }
  }

  render() {
    return this.uuidAdder(this.domStr(), this.uuid);
  }
}

export default Component;
