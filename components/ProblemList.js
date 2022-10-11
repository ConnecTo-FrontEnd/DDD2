// 설정 (카테고리, 레벨, 플랫폼)에 따라 다르게 렌더링 되므로 문제 리스트도 컴포넌트
import Component from '../core/Component.js';
import { Problem, Button } from './index.js';

const styledList = {
  'margin-top': '3rem',
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
  gap: '3rem',
};

const styledLoginPopUpContainer = {
  position: 'absolute',
  top: '17rem',
  width: '100%',
  height: '100%',
  'backdrop-filter': 'blur(6px)',
};

const styledLoginPopUp = {
  display: 'grid',
  margin: '10rem auto',
  padding: '2rem 0',
  gap: '1.5rem',
  width: '80%',
  border: '3px solid black',
  'border-radius': '6px',
  'font-size': '1.2rem',
};

class ProblemList extends Component {
  constructor(props) {
    super(props);
  }

  domStr() {
    const { problems, isLogIn } = this.props;
    return `
      <ul style="${this.converter(styledList)}">
        ${problems.map(({ level, title }) => new Problem({ level, title }).domStr()).join('')}
        ${
          isLogIn
            ? ''
            : `<div style="${this.converter(styledLoginPopUpContainer)}">
          <div style="${this.converter(styledLoginPopUp)}">
            <p>더 많은 문제를 추천 받고 싶다면?</p>
            ${new Button('로그인/회원가입').domStr()}
          </div>
        </div>`
        }
      </ul>`;
  }
}

export default ProblemList;
