import Component from '../../../../library/Component.js';
import styled from '../../../../library/styled.js';
import {
  getCategorizedProblems,
  requestAddProblem,
  requestDeleteProblem,
  userInfo,
} from '../../../shared/store/userInfo.js';
import theme from '../../../shared/styles/theme.js';

const styles = {
  container: styled({
    display: 'inline-block',
    position: 'relative',
    'margin-bottom': '5px',
    'min-width': '269px',
    height: '311px',
    'border-radius': '21px',
    '-webkit-box-shadow': '2px 5px 5px 1px rgba(0,0,0,0.69)',
    'box-shadow': '2px 5px 5px 1px rgba(0,0,0,0.69)',
  }),

  blurModal: styled({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    position: 'absolute',
    width: '100%',
    height: '311px',
    'border-radius': '21px',
    'backdrop-filter': 'blur(4px)',
    'z-index': '9999',
  }),

  lockImg: styled({
    'margin-bottom': '23px',
    width: '29px',
    height: '29px',
  }),

  lockMsg: styled({
    font: theme['font-kr-bold'],
    'font-size': '22px',
    color: 'white',
  }),

  problemTitleContainer: styled({
    position: 'relative',
    height: '256px',
    'border-radius': '21px 21px 0 0',
    background: 'no-repeat center url(../assets/temp.svg)',
  }),

  blurBg: styled({
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '64px',
    'backdrop-filter': 'blur(3px)',
  }),

  problemTitle: styled({
    position: 'absolute',
    left: '24px',
    bottom: '22px',
    font: theme['font-kr-bold'],
    'font-size': '25px',
    color: 'white',
  }),

  detailContainer: styled({
    padding: '11px',
    'padding-left': '70px',
    position: 'relative',
    'text-align': 'left',
    font: theme['font-kr-regular'],
    'font-size': '13px',
    color: 'black',
  }),

  logoImg: styled({
    position: 'absolute',
    top: '12px',
    left: '26px',
    width: '31px',
    height: '31px',
  }),

  deadlineContainer: styled({
    'font-size': '12px',
    color: '#a0a0a0',
  }),

  deleteBtn: styled({
    position: 'absolute',
    top: '18px',
    right: '18px',
    width: '20px',
    height: '20px',
    'font-size': '16px',
    color: 'white',
    background: 'url(../assets/trashbox-unexpired.svg)',
  }),
};

const getDeadline = (givenDate, day) => {
  const expiryDate = new Date(Date.parse(givenDate) + 86400000 * day);
  return 'D-' + Math.floor((expiryDate.getTime() - new Date().getTime()) / 86400000);
};

const LOGO = {
  programmers: '../assets/programmers.svg',
  boj: '../assets/boj.svg',
  leetcode: '../assets/leetcode.svg',
};

class ProblemItem extends Component {
  domStr() {
    const { solved, link, title, platform, category, givenDate, id } = this.props.problem;
    const { idx } = this.props;

    // prettier-ignore
    return `
      <li ${styles.container}>
        ${!userInfo && idx ? `
        <div ${styles.blurModal} class="blur-problem">
          <img src="../assets/lock.svg" ${styles.lockImg} />
          <p ${styles.lockMsg}>Sign in & Unlock</p>
        </div>` : ''}
        <a href="${link}" target="_blank' rel="noopener noreferrer">
          <div ${styles.problemTitleContainer}>
            <div ${styles.blurBg}>
              <span ${styles.problemTitle}>${title}</span>
            </div>
          </div>
          <div ${styles.detailContainer}>
            <img ${styles.logoImg} src="${LOGO[platform]}" />
            <div>${category}</div>
            <div ${styles.deadlineContainer}>
              <span>${getDeadline(givenDate, 7)}</span>
            </div>
          </div>
          </a>
        <button ${styles.deleteBtn} class="delete-btn" data-problem-id="${id}"></button>
      </li>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.blur-problem',
        handler: () => {
          navigator.go('/signin');
        },
      },
      {
        type: 'click',
        selector: '.delete-btn',
        handler: async e => {
          await requestDeleteProblem([e.target.dataset.problemId]);
          await requestAddProblem(userInfo.setting.number - getCategorizedProblems().unexpired.length);

          setTimeout(() => {
            this.setState.call(this, { isLoading: false });
          }, 500);
        },
      },
    ];
  }
}

export default ProblemItem;
