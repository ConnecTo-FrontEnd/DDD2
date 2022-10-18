import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';
import { getGuestCategorizedProblems } from '../../../shared/store/guestInfo.js';
import { getCategorizedProblems, requestDeleteProblem, userInfo } from '../../../shared/store/userInfo.js';
import theme from '../../../shared/styles/theme.js';
import { HistoryItem } from './index.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
    position: 'relative',
    width: '100%',
    padding: '0 20px 0 20px',
  }),

  title: styled({
    margin: '0 0 17px 1px',
    font: theme['font-en-bold'],
    'font-size': '25px',
  }),

  deleteAllBtn: styled({
    position: 'absolute',
    top: '7px',
    right: '20px',
    color: theme['orange-color'],
  }),
  itemContainer: styled({
    width: '100%',
  }),
};

class HistoryList extends Component {
  domStr() {
    const { expired } = userInfo ? getCategorizedProblems() : getGuestCategorizedProblems();

    // prettier-ignore
    return `
        <div ${styles.container}>
          <h2 ${styles.title}>Last</h2>
          <ul ${styles.itemContainer}>
            ${expired.map(problem => new HistoryItem({problem}).render()).join('')}
          </ul>
          <button ${styles.deleteAllBtn} class="delete-all-btn">Delete All</button>
        </div>
      `;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.delete-all-btn',
        handler: async () => {
          const { expired } = getCategorizedProblems();
          await requestDeleteProblem(expired.map(({ id }) => id));
          setTimeout(() => {
            this.setState.call(this);
          }, 300);
        },
      },
    ];
  }
}

export default HistoryList;
