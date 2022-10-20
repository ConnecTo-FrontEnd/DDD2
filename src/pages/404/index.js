import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { router } from '../../shared/router/index.js';
import { commonStyles, theme } from '../../shared/styles/theme.js';
import { Header, StyledButton } from '../../shared/components/index.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    gap: '5rem',
  }),
  homeBtn: styled({
    'background-color': theme['orange-color'],
    color: theme['white-color'],
    border: 'none',
    'font-size': '2rem',
  }),

  notFoundImage: styled({
    background: 'url(../assets/404.png)',
    width: '20rem',
    height: '10rem',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
  }),

  description: styled({
    color: theme['orange-color'],
    font: theme['font-kr-bold'],
    'font-size': '3rem',
  }),
};

class NotFound extends Component {
  domStr() {
    return `
    <div>
      ${new Header().render()}
        <div ${commonStyles.mdContainer} ${styles.container}>
        <div ${styles.notFoundImage}/></div>
        <p ${styles.description}">아무것도 없솔!</p>
        ${new StyledButton({ text: '홈으로', style: styles.homeBtn, onClick: this.goHome.bind(this) }).render()}
      </div>
    </div>
    `;
  }

  goHome() {
    router.go('/');
  }
}

export default NotFound;
