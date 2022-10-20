import styled from '../../library/styled.js';
import { theme } from './theme.js';

const formStyles = {
  title: styled({
    color: theme['orange-color'],
  }),
  subtitle: styled({
    display: 'block',
    'padding-top': '0.5rem',
    'padding-bottom': '3rem',
    'font-size': '1.3rem',
  }),

  popUpMsg: {
    invalid: styled({
      'background-color': theme['lightgray-color'],
    }),
    valid: styled({
      'background-color': theme['orange-color'],
    }),
  },

  submitBtn: {
    common: styled({
      width: '100%',
      'margin-top': '1rem',
      'border-radius': '10px',
      font: theme['font-kr-bold'],
      'font-size': '16px',
      color: 'white',
    }),
    active: styled({
      'background-color': theme['orange-color'],
    }),
    disabled: styled({
      'background-color': theme['lightgray-color'],
    }),
  },
  linkContainer: styled({
    font: theme['font-kr-regular'],
    'font-size': '1.2rem',
    'margin-top': '2rem',
  }),
  link: styled({
    'font-size': 'inherit',
    color: theme['orange-color'],
  }),
};

export default formStyles;
