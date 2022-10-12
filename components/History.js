import Component from '../library/Component.js';
import HistoryItem from './HistoryItem.js';

class ProblemList extends Component {
  domStr() {
    const problems = [{ title: '', level: 1 }];
    return `
      <ul>
        ${problems.map(({ level, title }) => new HistoryItem({ level, title }).render()).join('')}
      </ul>`;
  }
}

export default ProblemList;
