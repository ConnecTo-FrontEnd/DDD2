import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import { theme } from '../styles/theme.js';

const styles = {
  title: styled({
    font: theme['font-en-bold'],
    '@desktop': {
      'font-size': '3rem',
    },
    '@mobile': {
      'font-size': '2rem',
    },
  }),
};

class Title extends Component {
  domStr() {
    return `<h1 ${styles.title} ${this.props?.style ?? ''}>${this.props.title}</h1>`;
  }
}

export default Title;
