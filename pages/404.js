import Button from '../components/Button.js';
import Component from '../library/Component.js';
import styled from '../library/styled.js';
import { router } from '../router/index.js';
import theme from '../styles/theme.js';

const container = styled({
  display: 'flex',
  'flex-direction': 'column',
  'margin-top': '50%',
  transform: 'translateY(30%)',
  gap: '40px',
  'align-items': 'center',
  'justify-content': 'center',
});
const homeButton = styled({
  'background-color': theme['orange-color'],
  color: theme['white-color'],
  border: 'none',
});

const NotFoundImage = styled({
  background: 'url(../assets/404.png)',
  'background-size': 'contain',
  'background-repeat': 'no-repeat',
  width: '200px',
  height: '100px',
});

const Comment = styled({
  color: theme['orange-color'],
  font: theme['font-kr-regular'],
  'font-size': '24px',
});

class NotFound extends Component {
  domStr() {
    return `
      <div style="${container}">
        <div style="${NotFoundImage}"/></div>
        <p style="${Comment}">아무것도 없솔!</p>
        ${new Button({ text: '홈으로', style: homeButton, onClick: this.goHome.bind(this) }).render()}
      </div>
    `;
  }

  goHome() {
    router.go('/');
  }
}

export default NotFound;
