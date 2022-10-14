import Component from '../library/Component.js';
import { getCategorizedProblems } from '../store/userInfo.js';
import HistoryItem from './HistoryItem.js';

class HistoryList extends Component {
  domStr() {
    const { expired } = getCategorizedProblems();
    return `
      <ul>
        ${expired.map(({ category, title }) => new HistoryItem({ category, title }).render()).join('')}
      </ul>`;
  }
}

export default HistoryList;
