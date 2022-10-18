import Component from '../../../../library/Component.js';
import styled from '../../../../library/styled.js';
import theme from '../../../shared/styles/theme.js';

const styles = {
  description: styled({
    margin: '49px 0 14px 0',
    font: theme['font-kr-bold'],
    'font-size': '20px',
  }),

  loadingImg: styled({
    'margin-bottom': '118px',
    width: '201px',
    height: '201px',
    background: 'url(../assets/loading.svg)',
  }),
};

class Loading extends Component {
  domStr() {
    return `
      <p ${styles.description}>찾는 중..</p>
      <div ${styles.loadingImg}></div>`;
  }
}

export default Loading;
