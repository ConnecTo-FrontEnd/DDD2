import Component from '../library/Component.js';
import { getCategorizedProblems, requestDeleteProblem, userInfo } from '../store/userInfo.js';
import HistoryItem from './HistoryItem.js';
import styled from '../library/styled.js';
import theme from '../styles/theme.js';

const historyListContainer = styled({
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'flex-start',
  position: 'relative',
  margin: '28px',
});

const h2 = styled({
  margin: '0 0 17px 1px',
  font: theme['font-en-bold'],
  'font-size': '25px',
});

const deleteAllExpiredButton = styled({
  position: 'absolute',
  top: '7px',
  right: '0',
  color: theme['orange-color'],
});

const Container = styled({
  margin: '0 29px 45px 29px',
  'text-align': 'left',
});

const h2BeforeLogIn = styled({
  font: theme['font-en-bold'],
  'font-size': '25px',
});

const h3 = styled({
  margin: '15px 0 25px 0',
  font: theme['font-kr-bold'],
  'font-size': '18px',
});

const pContainer = styled({
  display: 'grid',
  gap: '10px',
  font: theme['font-kr-regular'],
  'font-size': '15px',
});

const rocketContainer = styled({
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
  'margin-top': '20px',
});

const rocketButton = styled({
  'margin-top': '8px',
  width: '158px',
  height: '33px',
  'border-radius': '40px',
  color: 'white',
  'background-color': theme['orange-color'],
});

class HistoryList extends Component {
  domStr() {
    const { expired } = getCategorizedProblems();

    if (userInfo)
      // prettier-ignore
      return `
      <div style="${historyListContainer}">
        <h2 style="${h2}">Last</h2>
        <ul>
        ${expired.map(problem => new HistoryItem({problem}).render()).join('')}
        </ul>
        <button style="${deleteAllExpiredButton}" class="delete-all-expired-button">Delete All</button>
      </div>`;

    return `
      <div style="${Container}">
        <h2 style="${h2BeforeLogIn}">More features</h2>
        <h3 style="${h3}">로그인 해서 모든 기능을 무료로 이용하세요!</h3>
        <div style="${pContainer}">
          <p>나만의 알고리즘 공부 루틴을 구성해보세요.</p>
          <p>매일매일 엄선된 문제를 제공받으세요.</p>
          <p>지난 문제를 복습해보세요.</p>
        </div>
        <div style="${rocketContainer}">
          <img src="../assets/rocket.svg">
          <button style="${rocketButton}" class="rocket-button">Get Started</button>
        </div>
      </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.delete-expired-button',
        handler: async e => {
          await requestDeleteProblem([e.target.dataset.problemId]);
          setTimeout(() => {
            this.setState.call(this);
          }, 300);
        },
      },
      {
        type: 'click',
        selector: '.delete-all-expired-button',
        handler: async e => {
          const { expired } = getCategorizedProblems();
          await requestDeleteProblem(expired.map(({ id }) => id));
          setTimeout(() => {
            this.setState.call(this);
          }, 300);
        },
      },
      {
        type: 'click',
        selector: '.rocket-button',
        handler: e => {
          console.log('HistoryList에서 로그아웃 상태에서 로켓 버튼 클릭함');
          // navigator.go('/signin');
        },
      },
    ];
  }
}

export default HistoryList;
