import Component from '../../../library/Component.js';
import styled from '../../../library/styled.js';
import { router } from '../../../shared/router/index.js';
import { theme } from '../../../shared/styles/theme.js';

const styles = {
  container: styled({
    'text-align': 'left',
  }),

  title: styled({
    font: theme['font-en-bold'],
    'font-size': '25px',
    '@desktop': {
      'margin-top': '10px',
    },
  }),

  subtitle: styled({
    margin: '15px 0 25px 0',
    font: theme['font-kr-bold'],
    'font-size': '18px',
    '@desktop': {
      'margin-top': '45px',
    },
  }),

  introduction: styled({
    display: 'grid',
    gap: '10px',
    font: theme['font-kr-regular'],
    'font-size': '15px',
  }),

  rocketContainer: styled({
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'margin-top': '20px',
    '@desktop': {
      transform: 'translateX(-15px)',
    },
  }),

  rocketBtn: styled({
    'margin-top': '8px',
    width: '158px',
    height: '33px',
    'border-radius': '40px',
    color: 'white',
    'background-color': theme['orange-color'],
  }),
};

class MoreFeatures extends Component {
  domStr() {
    return `
      <div ${styles.container}>
        <h2 ${styles.title}>More features</h2>
        <h3 ${styles.subtitle}>로그인 해서 모든 기능을 무료로 이용하세요!</h3>
        <div ${styles.introduction}>
          <p>나만의 알고리즘 공부 루틴을 구성해보세요.</p>
          <p>매일매일 엄선된 문제를 제공받으세요.</p>
          <p>지난 문제를 복습해보세요.</p>
        </div>
        <div ${styles.rocketContainer}>
          <img src="../assets/rocket.svg">
          <button ${styles.rocketBtn} class="rocket-btn">Get Started</button>
        </div>
      </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.rocket-btn',
        handler: () => {
          router.go('/signin');
        },
      },
    ];
  }
}

export default MoreFeatures;
