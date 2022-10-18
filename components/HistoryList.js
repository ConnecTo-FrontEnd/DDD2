import Component from '../library/Component.js';
import { getCategorizedProblems, requestDeleteProblem, userInfo } from '../store/userInfo.js';
import HistoryItem from './HistoryItem.js';
import styled from '../library/styled.js';
import theme from '../styles/theme.js';

const styles = {
  container: {
    login: styled({
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'flex-start',
      position: 'relative',
      margin: '28px',
    }),
    logout: styled({
      margin: '0 29px 45px 29px',
      'text-align': 'left',
    }),
  },

  title: {
    login: styled({
      margin: '0 0 17px 1px',
      font: theme['font-en-bold'],
      'font-size': '25px',
    }),
    logout: styled({
      font: theme['font-en-bold'],
      'font-size': '25px',
    }),
  },

  deleteAllBtn: styled({
    position: 'absolute',
    top: '7px',
    right: '0',
    color: theme['orange-color'],
  }),

  subtitle: styled({
    margin: '15px 0 25px 0',
    font: theme['font-kr-bold'],
    'font-size': '18px',
  }),

  introduction: styled({
    display: 'grid',
    gap: '10px',
    font: theme['font-kr-regular'],
    'font-size': '15px',
  }),

  rocketContainer: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'margin-top': '20px',
  }),

  rocketBtn: styled({
    'margin-top': '8px',
    width: '158px',
    height: '33px',
    'border-radius': '40px',
    color: 'white',
    'background-color': theme['orange-color'],
  }),
};

class HistoryList extends Component {
  domStr() {
    const { expired } = getCategorizedProblems();

    if (userInfo)
      // prettier-ignore
      return `
        <div ${styles.container.login}>
          <h2 ${styles.title.login}>Last</h2>
          <ul>
            ${expired.map(problem => new HistoryItem({problem}).render()).join('')}
          </ul>
          <button ${styles.deleteAllBtn} class="delete-all-btn">Delete All</button>
        </div>
      `;

    return `
      <div ${styles.container.logout}>
        <h2 ${styles.title.logout}>More features</h2>
        <h3 ${styles.subtitle}>로그인 해서 모든 기능을 무료로 이용하세요!</h3>
        <div ${styles.introduction}>
          <p>나만의 알고리즘 공부 루틴을 구성해보세요.</p>
          <p>매일매일 엄선된 문제를 제공받으세요.</p>
          <p>지난 문제를 복습해보세요.</p>
        </div>
        <div ${styles.rocketContainer}>
          <img src="../assets/rocket.svg">
          <button ${styles.rocketBtn} class="rocket-btn">Get Started</button>
        </div>
      </div>`;
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
      {
        type: 'click',
        selector: '.rocket-btn',
        handler: () => {
          navigator.go('/signin');
        },
      },
    ];
  }
}

export default HistoryList;
