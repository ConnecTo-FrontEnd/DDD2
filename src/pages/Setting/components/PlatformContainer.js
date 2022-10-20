import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';
import PLATFORMS from '../../../shared/constants/platforms.js';
import { theme } from '../../../shared/styles/theme.js';

const styles = {
  platformContainer: styled({
    display: 'flex',
    'padding-bottom': '1rem',
    '@mobile': {
      'flex-direction': 'column',
      gap: '1rem',
    },
  }),
  commonPlatform: styled({
    display: 'flex',
    'border-radius': '1rem',
    '@desktop': {
      width: '8rem',
      'flex-direction': 'column',
      'margin-right': '1rem',
    },
    '@mobile': {
      'flex-direction': 'row',
      'align-items': 'center',
      height: '4rem',
    },
  }),
  platformLabel: {
    unchecked: styled({
      border: `1px solid ${theme['lightgray-color']}`,
      color: theme['black-color'],
    }),
    checked: styled({
      border: `none`,
      background: 'orange',
      color: theme['white-color'],
    }),
  },
  platformImg: styled({
    '@desktop': {
      'border-radius': '100%',
      padding: '1rem 2rem',
    },
    '@mobile': {
      'border-radius': '100%',
      padding: '1rem 2rem',
    },
  }),
  platformItem: styled({
    display: 'none',
  }),
  moveBtn: {
    show: styled({
      visibility: 'visible',
    }),
    hide: styled({
      visibility: 'hidden',
    }),
  },
};

class PlatformContainer extends Component {
  domStr() {
    return `
      <div ${styles.platformContainer}>
        ${PLATFORMS.map(
          ({ id, content }) => `<label ${styles.commonPlatform} ${
            this.props.platform.includes(id) ? styles.platformLabel.checked : styles.platformLabel.unchecked
          } for=${content}>
              <img ${styles.platformImg} src='../../../assets/${id}.svg' />
              <span>${content}</span>
            </label>
            <input class="platform-input" ${
              styles.platformItem
            } value=${id} type="checkbox" id=${content} name="platform" ${
            this.props.platform.includes(id) ? 'checked' : ''
          } />`
        ).join('')}
      </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'change',
        selector: '.platform-input',
        handler: this.props.onChange ?? (() => {}),
      },
    ];
  }
}

export default PlatformContainer;
