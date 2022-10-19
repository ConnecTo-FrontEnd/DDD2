import { render } from '../../library/render/index.js';

const styled = styleObj =>
  ` style="${Object.entries(styleObj)
    .map(([property, value]) => {
      if (property === '@mobile') {
        return `@mobile={${Object.entries(value)
          .map(([p, v]) => `${p}: ${v}`)
          .join(';')}}`;
      }
      if (property === '@desktop') {
        return `@desktop={${Object.entries(value)
          .map(([p, v]) => `${p}: ${v}`)
          .join(';')}}`;
      }
      return `${property}: ${value}`;
    })
    .join(';')}; "`;

export default styled;
