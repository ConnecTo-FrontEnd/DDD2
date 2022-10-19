import Component from '../../library/Component.js';
import styled from '../../library/styled.js';
import theme from '../styles/theme.js';

const styles = {
  baseMsg: styled({
    position: 'fixed',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    width: '100%',
    height: '5rem',
    left: 0,
    background: 'orange',
    color: theme['white-color'],
    font: theme['font-kr-light'],
    'font-size': '1.4rem',
    transition: 'all 1s',
  }),
  show: styled({
    top: '0',
  }),
  hide: styled({
    top: '-5rem',
  }),
};

class PopUpMsg extends Component {
  domStr() {
    return `
      <p ${styles.baseMsg} ${this.props.isPopUp ? styles.show : styles.hide}>
        ${this.props.msg}
      </p>
    </div>`;
  }
}

export default PopUpMsg;
