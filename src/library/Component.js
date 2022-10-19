import { render, eventHolder } from './render/index.js';

const breakpoint = 900;
window.matchMedia(`(max-width:  ${breakpoint}px)`).addEventListener('change', e => {
  console.log('changed');
  render();
});
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

  preprocessor(domStr) {
    let result = domStr;
    result = this.uuidAdder(result);
    result = this.styleCombinator(result);
    result = this.mediaQueryProcessor(result);
    return result;
  }

  uuidAdder(domStr) {
    const firstTag = /<[^>]*>/;
    return domStr.replace(firstTag, tag => tag.split('>')[0] + ` data-uuid="${this.uuid}">`);
  }

  styleCombinator(domStr) {

    const tags = /<[^>]*>/g;

    return domStr.replaceAll(tags, tag => {
      if (!tag.includes('style')) return tag;

      const styleRegex = /style="([^"])*"/g;
      const styles = [...tag.match(styleRegex)].map(style => style.split('"')[1]).join('');
      return tag.replaceAll(styleRegex, '').split('>')[0] + ` style="${styles}">`;
    });
  }

  mediaQueryProcessor(domStr) {
    const tags = /<[^>]*>/g;
    const isMobile = window.matchMedia(`(max-width:  ${breakpoint}px)`).matches;
    const isDesktop = window.matchMedia(`(min-width:  ${breakpoint}px)`).matches;
    const mobileRegex = /@mobile={([^\}])*}/g;
    const desktopRegex = /@desktop={([^\}])*}/g;
    return domStr.replaceAll(tags, tag => {
      if (!tag.includes('style')) return tag;

      if (isMobile) {
        tag = tag.replace(mobileRegex, mediaQuery => mediaQuery.split('{')[1].replace('}', ';'));
        tag = tag.replace(desktopRegex, '');
      }
      if (isDesktop) {
        tag = tag.replace(desktopRegex, mediaQuery => mediaQuery.split('{')[1].replace('}', ';'));
        tag = tag.replace(mobileRegex, '');
      }
      return tag;
    });
  }

  holdEvents() {
    const events = this.addEventListener?.();
    if (!events) return;

    for (const event of events) {
      if (event.selector === 'window' || !event.selector) {
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
    return this.preprocessor(this.domStr());
  }
}

export default Component;
