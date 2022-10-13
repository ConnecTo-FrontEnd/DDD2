import Component from '../library/Component.js';
import ProblemItem from './ProblemItem.js';
import Button from './Button.js';

const styledList = {
  display: 'flex',
  margin: '2rem',
  'white-space': 'nowrap',
  'overflow-x': 'scroll',
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
  domStr() {
    const isLogIn = true;
    const { problems } = this.props;
    return `
      <ul style="${this.converter(styledList)}">
        ${problems.map(problem => new ProblemItem(problem).render()).join('')}
        ${
          isLogIn
            ? ``
            : `
        <div style="${this.converter(styledLoginPopUpContainer)}">
          <div style="${this.converter(styledLoginPopUp)}">
            <p>더 많은 문제를 추천 받고 싶다면?</p>
            ${new Button('로그인/회원가입').render()}
          </div>
        </div>`
        }
      </ul>
      `;
  }
}

export default ProblemList;
