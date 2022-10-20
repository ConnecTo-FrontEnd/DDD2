import styled from '../../library/styled.js';

const theme = {
  // eslint-prettier-ignore
  'orange-color': '#fb8d57',
  'lightorange-color': '#FFD384',
  'yellow-color': '#FFF9B0',
  'lightgray-color': '#a0a0a0',
  'white-color': '#ffffff',
  'black-color': '#1a2b3c',
  'pink-color': 'F8C4B4',
  'green-color': 'BCE29E',
  'font-kr-bold': "bold 1.2rem 'Noto Sans KR', sans-serif",
  'font-kr-regular': "regular 1.2rem 'Noto Sans KR', sans-serif",
  'font-en-bold': "bold 1.2rem 'Ubuntu', sans-serif",
  'font-en-regular': "regular 1.2rem 'Ubuntu', sans-serif",
};

const commonStyles = {
  rootContainer: styled({
    'max-width': '1500px',
    margin: '0 auto',
    'background-color': 'white',
    'text-align': 'center',
    'min-height': '100vh',
  }),

  mdContainer: styled({
    width: '100%',
    '@mobile': {
      padding: '0 2rem',
    },
    '@desktop': {
      width: '50%',
      margin: '0 auto',
    },
  }),

  lgContainer: styled({
    '@mobile': {
      padding: '0 2rem',
    },
    '@desktop': {
      width: '90%',
      margin: '0 auto',
    },
  }),
};

export { theme, commonStyles };
