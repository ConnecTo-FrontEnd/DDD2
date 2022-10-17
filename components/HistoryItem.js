import Component from '../library/Component.js';
import styled from '../library/styled.js';
import theme from '../styles/theme.js';

const container = styled({
  display: 'flex',
  'justify-content': 'space-between',
  'margin-bottom': '24px',
  width: '344px',
});

const a = styled({
  display: 'flex',
});

const container2 = styled({
  display: 'flex',
  'flex-direction': 'column',
  'justify-content': 'space-between',
  'align-items': 'flex-start',
});

const problemCategory = styled({
  'font-size': '12px',
  color: theme['orange-color'],
});

const problemTitle = styled({
  font: theme['font-kr-bold'],
  color: 'black',
});

const container3 = styled({
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'flex-end',
  'margin-right': '10px',
});

const deleteExpiredButton = styled({
  margin: '5px 0',
  width: '18px',
  height: '18px',
  background: 'url(../assets/trashbox.svg)',
});

const limitTime = styled({
  font: theme['font-kr-regular'],
  'font-size': '12px',
  color: theme['lightgray-color'],
});

const LOGO = {
  programmers: '../assets/programmers.svg',
  boj: '../assets/boj.svg',
  leetcode: '../assets/leetcode.svg',
};

class HistoryItem extends Component {
  domStr() {
    const { platform, category, title, link, id } = this.props.problem;
    return `
      <li style="${container}">
        <a style="${a}" href="${link}">
          <img style="margin-right: 23px" src="${LOGO[platform]}"></img>
          <div style="${container2}">
            <p style="${problemCategory}">${category}</p>
            <p style="${problemTitle}">${title}</p>
          </div>
        </a>
        <div style="${container3}">
          <button style="${deleteExpiredButton}" class="delete-expired-button" data-problem-id="${id}"></button>
          <span style="${limitTime}">45min</span>
        </div>
      </li>`;
  }
}

export default HistoryItem;
