const styled = styleObj =>
  ` style="${Object.entries(styleObj)
    .map(([property, value]) => `${property}: ${value}`)
    .join(';')}; "`;

export default styled;
