import Component from '../library/Component.js';
import HistoryItem from './HistoryItem.js';

class HistoryList extends Component {
  domStr() {
    const { problems } = this.props;
    return `
      <ul>
        ${problems.map(({ category, title }) => new HistoryItem({ category, title }).render()).join('')}
      </ul>`;
  }
}

export default HistoryList;
