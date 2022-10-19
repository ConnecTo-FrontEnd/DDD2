import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';
import { getGuestCategorizedProblems } from '../../../shared/store/guestInfo.js';
import {
  getCategorizedProblems,
  requestDeleteProblem,
  requestAddProblem,
  userInfo,
} from '../../../shared/store/userInfo.js';
import theme from '../../../shared/styles/theme.js';
import { ProblemItem, Loading } from './index.js';

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

  problemsContainer: styled({
    display: 'flex',
    margin: '23px 0 57px 0',
    padding: '20px 20px 20px 5px',
    'white-space': 'nowrap',
    'overflow-x': 'scroll',
    'scrollbar-width': 'none',
    gap: '41px',
    width: '90vw',
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
    this.state = { isLoading: userInfo ? getCategorizedProblems().unexpired.length < userInfo.setting.number : false };
    if (!this.state.isLoading) return;

    requestAddProblem(userInfo.setting.number - getCategorizedProblems().unexpired.length).then(() => {
      setTimeout(() => {
        this.setState.call(this, { isLoading: false });
      }, 1000);
    });
  }

  domStr() {
    const { unexpired } = userInfo ? getCategorizedProblems() : getGuestCategorizedProblems();

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
          ${userInfo ? `<div class="shuffle" ${styles.shuffle}></div>` : ''}
        </div>
        <ul ${styles.problemsContainer}>
          ${unexpired.map((problem, idx) => new ProblemItem({ problem, blocked: !userInfo && idx > 0, onDeleteClick: this.deleteItem.bind(this) }).render()).join('')}
        </ul>
      </div>`;
  }

  addEventListener() {
    return [
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

  async deleteItem(e) {
    await requestDeleteProblem([e.target.dataset.problemId]);
    await requestAddProblem(userInfo.setting.number - getCategorizedProblems().unexpired.length);

    setTimeout(() => {
      this.setState.call(this, { isLoading: false });
    }, 500);
  }
}

export default ProblemList;
