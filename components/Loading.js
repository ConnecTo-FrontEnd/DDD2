import Component from '../library/Component.js';
import styled from '../library/styled.js';
import theme from '../styles/theme.js';

const p = styled({
  margin: '49px 0 14px 0',
  font: theme['font-kr-bold'],
  'font-size': '20px',
});

const loading = styled({
  'margin-bottom': '118px',
  width: '201px',
  height: '201px',
  background: 'url(../assets/loading.svg)',
});

class Loading extends Component {
  domStr() {
    return `
      <p style="${p}">찾는 중..</p>
      <div style="${loading}"></div>`;
  }
}

export default Loading;
