import Component from '../library/Component.js';
import styled from '../library/styled.js';
import theme from '../styles/theme.js';

const container = styled({
  display: 'inline-block',
  position: 'relative',
  'margin-bottom': '5px',
  'min-width': '269px',
  height: '311px',
  'border-radius': '21px',
  '-webkit-box-shadow': '2px 5px 5px 1px rgba(0,0,0,0.69)',
  'box-shadow': '2px 5px 5px 1px rgba(0,0,0,0.69)',
});

const blurContainer = styled({
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
});

const lock = styled({
  'margin-bottom': '23px',
  width: '29px',
  height: '29px',
});

const lockMessage = styled({
  font: theme['font-kr-bold'],
  'font-size': '22px',
  color: 'white',
});

const container2 = styled({
  position: 'relative',
  height: '256px',
  'border-radius': '21px 21px 0 0',
  background: 'no-repeat center url(../assets/temp.svg)',
});

const styledBlur = styled({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  height: '64px',
  'backdrop-filter': 'blur(3px)',
});

const problemTitle = styled({
  position: 'absolute',
  left: '24px',
  bottom: '22px',
  font: theme['font-kr-bold'],
  'font-size': '25px',
  color: 'white',
});

const container3 = styled({
  padding: '11px',
  'padding-left': '70px',
  position: 'relative',
  'text-align': 'left',
  font: theme['font-kr-regular'],
  'font-size': '13px',
  color: 'black',
});

const img = styled({
  position: 'absolute',
  top: '12px',
  left: '26px',
  width: '31px',
  height: '31px',
});

const container4 = styled({
  'font-size': '12px',
  color: '#a0a0a0',
});

const deleteUnexpiredButton = styled({
  position: 'absolute',
  top: '18px',
  right: '18px',
  width: '20px',
  height: '20px',
  'font-size': '16px',
  color: 'white',
  background: 'url(../assets/trashbox-unexpired.svg)',
});

const LOGO = {
  programmers: '../assets/programmers.svg',
  boj: '../assets/boj.svg',
  leetcode: '../assets/leetcode.svg',
};

const getDeadline = (givenDate, day) => {
  const expiryDate = new Date(Date.parse(givenDate) + 86400000 * day);
  return 'D-' + Math.floor((expiryDate.getTime() - new Date().getTime()) / 86400000);
};

class ProblemItem extends Component {
  domStr() {
    const { solved, link, title, platform, category, givenDate, id } = this.props.problem;
    const { idx } = this.props;
    const userInfo = false;

    // prettier-ignore
    return solved ? '' : `
      <li style="${container}">
        ${!userInfo && idx ? `
        <div style="${blurContainer}" class="blur-problem">
          <img src="../assets/lock.svg" style="${lock}"></img>
          <p style="${lockMessage}">Sign in & Unlock</p>
        </div>` : ''}
        <a href="${link}">
          <div style="${container2}">
            <div style="${styledBlur}">
              <span style="${problemTitle}" class="problem-title">${title}</span>
            </div>
          </div>
          <div style="${container3}">
          <img style="${img}" src="${LOGO[platform]}" class="platform-logo"></img>
          <div>${category}</div>
            <div style="${container4}">
              <span>${getDeadline(givenDate, 7)}</span>
              <span>45 min</span>
            </div>
          </div>
          </a>
        <button style="${deleteUnexpiredButton}" class="delete-unexpired-button" data-problem-id="${id}"></button>
      </li>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.blur-problem',
        handler: e => {
          console.log('ProblemItem에서 블러 문제 클릭함');
          // navigator.go('/signin');
        },
      },
    ];
  }
}

export default ProblemItem;
