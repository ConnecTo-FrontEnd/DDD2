import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';
import { requestDeleteProblem } from '../../../shared/store/userInfo.js';
import theme from '../../../shared/styles/theme.js';

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
          <button ${styles.deleteBtn}" data-problem-id="${id}"></button>
        </div>
      </li>`;
  }

  addEventListener() {
    const { onClickDeleteBtn } = this.props;

    return [
      {
        type: 'click',
        selector: 'button',
        handler: onClickDeleteBtn,
      },
    ];
  }
}

export default HistoryItem;
