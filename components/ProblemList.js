import Component from '../library/Component.js';
import ProblemItem from './ProblemItem.js';
import Button from './Button.js';
import { getCategorizedProblems, requestDeleteProblem, requestAddProblem } from '../store/userInfo.js';
import Loading from './Loading.js';

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
  constructor(props) {
    super(props);
    this.state = { isLoading: getCategorizedProblems().unexpired.length === 0 };
  }

  domStr() {
    const isLogIn = true;
    const { unexpired } = getCategorizedProblems();

    if (this.state.isLoading)
      return `
        <div>
          ${new Loading().render()}
        </div>
      `;

    return `
      <div>
        <ul style="${this.converter(styledList)}">
        ${unexpired.map(problem => new ProblemItem({ problem }).render()).join('')}
        ${
          isLogIn
            ? ''
            : `
        <div style="${this.converter(styledLoginPopUpContainer)}">
          <div style="${this.converter(styledLoginPopUp)}">
            <p>더 많은 문제를 추천 받고 싶다면?</p>
            ${new Button('로그인/회원가입').render()}
          </div>
        </div>`
        }
        </ul>
      </div>
      `;
  }

  addEventListener() {
    return [
      {
        type: 'DOMContentLoaded',
        selector: 'window',
        handler: async () => {
          if (!this.state.isLoading) return;

          await requestAddProblem();

          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 1000);
        },
      },
      {
        type: 'click',
        selector: 'button',
        handler: async e => {
          await requestDeleteProblem(e.target.dataset.problemId);
          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 500);
        },
      },
    ];
  }
}

export default ProblemList;
