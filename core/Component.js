import eventHolder from '../render/eventHolder.js';

class Component {
  constructor(props) {
    this.state = {};
    this.props = props;
    this.uuid = this.constructor.name + '-' + self.crypto.randomUUID().slice(0, 8);
    this.holdEvents();
  }

  classAdder(domStr, uuid) {
    const firstTag = /<.*>/;
    const classRegex = /class( )*=( )*("|')(.)*('|")/;
    return domStr.replace(firstTag, tag => {
      if (!tag.match(classRegex)) return tag.split('>')[0] + ` class="${uuid}">`;
      return tag.replace(classRegex, c => `class="${uuid} ${c.replaceAll("'", '"').split('"')[1]}"`);
    });
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
        eventHolder.push(event);
        continue;
      }
      const { selector, handler } = event;

      event.handler = e => {
        if (e.target.closest(`.${this.uuid}`) && e.target.closest(selector)) {
          handler(e);
        }
      };

      eventHolder.push(event);
    }
  }

  render() {
    return this.classAdder(this.domStr(), this.uuid);
  }
}

export default Component;
