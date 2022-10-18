import Component from '../library/Component.js';
import ProblemItem from './ProblemItem.js';
import { getCategorizedProblems, requestDeleteProblem, requestAddProblem, userInfo } from '../store/userInfo.js';
import Loading from './Loading.js';
import styled from '../library/styled.js';
import theme from '../styles/theme.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
  }),

  allsols: styled({
    display: 'flex',
    'justify-content': 'space-between',
    'text-align': 'left',
    width: '100%',
    'padding-left': '26px',
    'padding-right': '26px',
    font: theme['font-en-bold'],
    'font-size': '28px',
  }),

  problems: styled({
    display: 'flex',
    margin: '23px 0 57px 26px',
    'white-space': 'nowrap',
    'overflow-x': 'scroll',
    'scrollbar-width': 'none',
    gap: '41px',
    width: '100%',
  }),

  shuffle: styled({
    background: 'url(../assets/shuffle.png)',
    'background-size': 'contain',
    'background-repeat': 'no-repeat',
    width: '30px',
    height: '30px',
  }),
};

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: getCategorizedProblems().unexpired.length === 0 };
  }

  domStr() {
    const { unexpired } = getCategorizedProblems();
    if (this.state.isLoading)
      return `
        <div ${styles.container}>
          ${new Loading().render()}
        </div>`;

    // prettier-ignore
    return `
      <div ${styles.container}>
        <div ${styles.allsols}>
          <span>Allsols</span>
          <div class="shuffle" ${styles.shuffle}></div>
        </div>
        <ul ${styles.problems}>
          ${unexpired.map((problem, idx) => new ProblemItem({ problem, idx, userInfo }).render()).join('')}
        </ul>
      </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'DOMContentLoaded',
        selector: 'window',
        handler: async () => {
          // 로딩 문제 여기임
          if (!this.state.isLoading) return;

          await requestAddProblem();
          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 1000);
        },
      },
      {
        type: 'click',
        selector: '.shuffle',
        handler: async () => {
          const { unexpired } = getCategorizedProblems();
          await requestDeleteProblem(unexpired.flatMap(({ id }) => id));
          await requestAddProblem();
          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 500);
        },
      },
    ];
  }
}

export default ProblemList;
