import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';
import { getGuestCategorizedProblems, requestInitGuestInfo } from '../../../shared/store/guestInfo.js';
import {
  getCategorizedProblems,
  requestDeleteProblem,
  requestAddProblem,
  requestCheckSolvedProblem,
  userInfo,
} from '../../../shared/store/userInfo.js';
import {theme} from '../../../shared/styles/theme.js';
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
  loadingContainer: styled({
    display: 'flex',
    'justify-content': 'center',
    margin: '23px 0 0 0',
    padding: '20px',
    'white-space': 'nowrap',
    'overflow-x': 'scroll',
    'scrollbar-width': 'none',
    gap: '41px',
    width: '90vw',
    '@desktop': {
      width: '650px',
      'overflow-x': 'hidden',
      'flex-wrap': 'wrap',
      'column-gap': '80px',
    },
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
    '@desktop': {
      width: '650px',
      'overflow-x': 'hidden',
      'flex-wrap': 'wrap',
      'column-gap': '80px',
    },
  }),

  shuffle: styled({
    background: 'url(../assets/shuffle.png)',
    'background-size': 'contain',
    'background-repeat': 'no-repeat',
    width: '30px',
    height: '30px',
  }),
  titleAndShuffle: styled({
    display: 'flex',
    '@mobile': {
      'justify-content': 'space-between',
      width: '100%',
    },
    '@desktop': {
      'column-gap': '20px',
      'align-items': 'center',
    },
  }),
};

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    if (!this.state.isLoading) return;
    if (userInfo) {
      const diff = getCategorizedProblems().unexpired.length - userInfo.setting.number;
      if (diff < 0) {
        requestAddProblem(Math.abs(diff)).then(() => {
          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 1000);
        });
      } else if (diff > 0) {
        const removeIds = getCategorizedProblems()
          .unexpired.slice(0, diff)
          .flatMap(({ id }) => id);
        requestDeleteProblem(removeIds).then(() => {
          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 1000);
        });
      } else {
        setTimeout(() => {
          this.setState.call(this, { isLoading: false });
        });
      }
    } else {
      requestInitGuestInfo().then(() => {
        setTimeout(() => {
          this.setState.call(this, { isLoading: false });
        }, 1000);
      });
    }
  }

  domStr() {
    const { unexpired } = userInfo ? getCategorizedProblems() : getGuestCategorizedProblems();
    // prettier-ignore
    return `
      <div ${styles.container}>
        <div ${styles.allsols}>
          <div ${styles.titleAndShuffle}>
            <span>Allsols</span>
            ${userInfo ? `<div class="shuffle" ${styles.shuffle}></div>` : ''}
          </div>
        </div>
        ${this.state.isLoading ? `
        <div ${styles.loadingContainer}>
          ${new Loading().render()}
        </div>` : 
        `<ul ${styles.problemsContainer}>
          ${unexpired.map((problem, idx) => new ProblemItem({ problem, blocked: !userInfo && idx > 0, onDeleteClick: this.deleteItem.bind(this), onLinkClick: userInfo ? this.checkSolvedItem.bind(this) : ()=>{} }).render()).join('')}
        </ul>`}
      </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.shuffle',
        handler: async () => {
          this.setState.call(this, { isLoading: true });

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

  async checkSolvedItem(e) {
    const { id } = userInfo;
    const { problemId } = e.target.closest('a').dataset;
    await requestCheckSolvedProblem({ id, problemId });
    this.setState.call(this);
  }
}

export default ProblemList;
