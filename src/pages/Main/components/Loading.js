import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';
import theme from '../../../shared/styles/theme.js';

const styles = {
  description: styled({
    margin: '30px 0 14px 0',
    font: theme['font-kr-bold'],
    'font-size': '20px',
  }),

  loadingImg: styled({
    width: '300px',
    height: '300px',
    background: 'url(../assets/searching.gif)',
    'background-size': 'cover',
    '@desktop': {
      width: '400px',
      height: '400px',
    },
  }),
};

class Loading extends Component {
  domStr() {
    return `
    <div>
      <p ${styles.description}>찾는 중..</p>
      <div ${styles.loadingImg} ></div>
    </div>`;
  }
}

export default Loading;
