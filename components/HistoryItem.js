import Component from '../library/Component.js';
import styled from '../library/styled.js';
import { requestDeleteProblem } from '../store/userInfo.js';
import theme from '../styles/theme.js';

const styles = {
  container: styled({
    display: 'flex',
    'justify-content': 'space-between',
    'margin-bottom': '24px',
    idth: '344px',
  }),

  problemLink: styled({
    display: 'flex',
  }),

  categoryTitleContainer: styled({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    'align-items': 'flex-start',
  }),

  problemCategory: styled({
    'font-size': '12px',
    color: theme['orange-color'],
  }),

  problemTitle: styled({
    font: theme['font-kr-bold'],
    color: 'black',
  }),

  deleteContainer: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-end',
    'margin-right': '10px',
  }),

  deleteBtn: styled({
    margin: '5px 0',
    width: '18px',
    height: '18px',
    background: 'url(../assets/trashbox.svg)',
  }),

  platformImg: styled({
    'margin-right': '23px',
  }),
};

const logoSrc = {
  programmers: '../assets/programmers.svg',
  boj: '../assets/boj.svg',
  leetcode: '../assets/leetcode.svg',
};

class HistoryItem extends Component {
  domStr() {
    const { platform, category, title, link, id } = this.props.problem;

    return `
      <li ${styles.container}>
        <a ${styles.problemLink} href="${link}">
          <img ${styles.platformImg} src="${logoSrc[platform]}" />
          <div ${styles.categoryTitleContainer}">
            <p ${styles.problemCategory}">${category}</p>
            <p ${styles.problemTitle}">${title}</p>
          </div>
        </a>
        <div ${styles.deleteContainer}">
          <button ${styles.deleteBtn}" class="delete-btn" data-problem-id="${id}"></button>
        </div>
      </li>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.delete-btn',
        handler: async e => {
          await requestDeleteProblem([e.target.dataset.problemId]);
          setTimeout(() => {
            this.setState.call(this);
          }, 300);
        },
      },
    ];
  }
}

export default HistoryItem;
