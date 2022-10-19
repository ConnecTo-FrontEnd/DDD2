import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { router } from '../../shared/router/index.js';
import theme from '../../shared/styles/theme.js';
import { StyledButton } from '../../shared/components/index.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    'margin-top': '50%',
    transform: 'translateY(30%)',
    gap: '40px',
    'align-items': 'center',
    'justify-content': 'center',
    '@desktop': {
      'background-color': 'red',
    },
    '@mobile': {
      'background-color': 'green',
    },
  }),
  homeBtn: styled({
    'background-color': theme['orange-color'],
    color: theme['white-color'],
    border: 'none',
  }),

  notFoundImage: styled({
    background: 'url(../assets/404.png)',
    'background-size': 'contain',
    'background-repeat': 'no-repeat',
    width: '200px',
    height: '100px',
  }),

  description: styled({
    color: theme['orange-color'],
    font: theme['font-kr-regular'],
    'font-size': '24px',
  }),
};

class NotFound extends Component {
  domStr() {
    return `
      <div ${styles.container}">
        <div ${styles.notFoundImage}"/></div>
        <p ${styles.description}">아무것도 없솔!</p>
        ${new StyledButton({ text: '홈으로', style: styles.homeBtn, onClick: this.goHome.bind(this) }).render()}
      </div>
    `;
  }

  goHome() {
    router.go('/');
  }
}

export default NotFound;
