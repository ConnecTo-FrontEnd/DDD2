class Component {
  constructor(props) {
    this.state = {};
    this.props = props;
  }

  converter(selector) {
    return Object.entries(selector)
      .map(([property, value]) => `${property}: ${value}`)
      .join(';');
  }
}

export default Component;
