import Component from '../library/Component.js';
import styled from '../library/styled.js';
import theme from '../styles/theme.js';

const problemItem = styled({
  'min-width': '269px',
  height: '311px',
  'border-radius': '21px',
  '-webkit-box-shadow': '2px 5px 5px 1px rgba(0,0,0,0.69)',
  'box-shadow': '2px 5px 5px 1px rgba(0,0,0,0.69)',
});

const styledDiv = styled({
  position: 'relative',
  height: '256px',
  background: 'url(../assets/temp.svg)',
});

const styledBlur = styled({
  position: 'absolute',
  left: '24px',
  bottom: '22px',
});

const styledTitle = styled({
  font: theme['font-kr-bold'],
  'font-size': '25px',
  color: 'white',
});

const styledFooter = styled({
  padding: '11px',
  'padding-left': '70px',
  position: 'relative',
  'text-align': 'left',
  font: theme['font-kr-regular'],
  'font-size': '13px',
  color: 'black',
});

const styledImg = styled({
  position: 'absolute',
  top: '12px',
  left: '26px',
});

const styledTemp = styled({
  'font-size': '12px',
  color: '#a0a0a0',
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
    const { solved, link, title, platform, category, givenDate } = this.props;
    return solved
      ? ''
      : `
      <li style="${problemItem}">
        <a href="${link}">
          <div style="${styledDiv}">
            <div style="${styledBlur}">
              <span style="${styledTitle}" class="problem-title">${title}</span>
            </div>
          </div>
          <div style="${styledFooter}">
            <img style="${styledImg}" src="${LOGO[platform]}" class="platform-logo"></img>
            <div>${category}</div>
            <div style="${styledTemp}">
              <span>${getDeadline('2022-10-10T04:28:49.103Z', 7)}</span>
              <span>10 min</span>
            </div>
          </div>
        </a>
      </li>`;
  }
}

export default ProblemItem;
