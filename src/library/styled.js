const styled = styleObj =>
  ` style="${Object.entries(styleObj)
    .map(([property, value]) => {
      const isMobile = window.matchMedia('(max-width:  768px)').matches;
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      if (property === 'mobile') {
        if (isMobile) {
          return Object.entries(value)
            .map(([p, v]) => `${p}: ${v}`)
            .join(';');
        }
        return '';
      }
      if (property === 'desktop') {
        if (isDesktop) {
          return Object.entries(value)
            .map(([p, v]) => `${p}: ${v}`)
            .join(';');
        }
        return '';
      }
      return `${property}: ${value}`;
    })
    .join(';')}; "`;

export default styled;
