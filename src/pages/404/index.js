import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { router } from '../../shared/router/index.js';
import { commonStyles, theme } from '../../shared/styles/theme.js';
import { StyledButton } from '../../shared/components/index.js';

const styles = {
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
      <div ${commonStyles.mdContainer}">
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
