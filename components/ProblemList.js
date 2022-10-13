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
    const problems = [
      {
        platform: 'programmers',
        category: '정렬',
        title: '사다리꼴 넓이',
        link: 'https://www.acmicpc.net/problem/2557',
        id: 'boj2557',
        solved: false,
        givenDate: '2022-10-10T04:28:49.103Z',
      },
      {
        platform: 'boj',
        category: '구현',
        title: 'Hello World',
        link: 'https://www.acmicpc.net/problem/2557',
        id: 'boj2557',
        solved: false,
        givenDate: '2022-10-10T04:28:49.103Z',
      },
      {
        platform: 'boj',
        category: '구현',
        title: 'Hello World',
        link: 'https://www.acmicpc.net/problem/2557',
        id: 'boj2557',
        solved: false,
        givenDate: '2022-10-10T04:28:49.103Z',
      },
      {
        platform: 'boj',
        category: '구현',
        title: 'Hello World',
        link: 'https://www.acmicpc.net/problem/2557',
        id: 'boj2557',
        solved: false,
        givenDate: '2022-10-10T04:28:49.103Z',
      },
      {
        platform: 'boj',
        category: '구현',
        title: 'Hello World',
        link: 'https://www.acmicpc.net/problem/2557',
        id: 'boj2557',
        solved: false,
        givenDate: '2022-10-10T04:28:49.103Z',
      },
      {
        platform: 'boj',
        category: '구현',
        title: 'Hello World',
        link: 'https://www.acmicpc.net/problem/2557',
        id: 'boj2557',
        solved: false,
        givenDate: '2022-10-10T04:28:49.103Z',
      },
    ];

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
