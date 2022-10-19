import Component from '../../../library/Component.js';
import PLATFORMS from '../../../shared/constants/platforms.js';
import { requestLogout, requestSaveSetting, userInfo } from '../../../shared/store/userInfo.js';
import { SelectBox } from './index.js';
import { router } from '../../../shared/router/index.js';
import StyledButton from '../../../shared/components/StyledButton.js';
import styled from '../../../library/styled.js';
import theme from '../../../shared/styles/theme.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    padding: '0 2rem',
  }),
  profileImage: styled({
    width: '7rem',
    'border-radius': '100%',
    margin: '0 auto',
  }),
  inputLabel: styled({
    display: 'block',
    margin: '1rem 0',
    font: theme['font-en-bold'],
    'text-align': 'left',
  }),
  inputItem: styled({
    display: 'block',
    width: '100%',
    padding: '1rem',
    border: `1px solid ${theme['lightgray-color']}`,
    'border-radius': '6px',
    'text-align': 'left',
  }),
  selectContainer: styled({
    display: 'flex',
    gap: '1rem',
  }),
  platformContainer: styled({
    display: 'flex',
    'overflow-x': 'scroll',
    'padding-bottom': '1rem',
  }),
  platformLabel: {
    unchecked: styled({
      display: 'flex',
      'flex-direction': 'column',
      width: '8rem',
      'margin-right': '1rem',
      border: `1px solid ${theme['lightgray-color']}`,
      'border-radius': '1rem',
    }),
    checked: styled({
      display: 'flex',
      'flex-direction': 'column',
      width: '8rem',
      'margin-right': '1rem',
      'border-radius': '1rem',
      border: `none`,
      background: theme['orange-color'],
      color: theme['white-color'],
    }),
  },
  platformImg: styled({
    'border-radius': '100%',
    padding: '1rem 2rem',
  }),
  platformItem: styled({
    display: 'none',
  }),
  settingBtn: styled({
    display: 'block',
    width: '100%',
    'margin-top': '1rem',
    color: theme['white-color'],
    'font-weight': theme['font-kr-bold'],
    background: theme['orange-color'],
    border: 'none',
  }),
  disabledBtn: styled({
    display: 'block',
    width: '100%',
    'margin-top': '1rem',
    color: theme['white-color'],
    'font-weight': theme['font-kr-bold'],
    border: 'none',
    background: theme['lightgray-color'],
  }),
  saveMsg: {
    show: styled({
      visibility: 'visible',
      opacity: '100%',
      'margin-top': '1rem',
      transition: 'all 1s',
    }),
    hide: styled({
      visibility: 'hidden',
      opacity: '0%',
      'margin-top': '1rem',
    }),
  },
};

class UserSetting extends Component {
  constructor(props) {
    super(props);
    this.state = { ...userInfo.setting, isSaving: true, isValid: true };
  }

  domStr() {
    return `
    <div ${styles.container}>
    <image ${styles.profileImage} src="./../assets/profile.svg" />
    <form>
      <label ${styles.inputLabel} for="setting-nickname">Nickname</label>
      <input ${styles.inputItem} class="nickname-input" type="text" id="setting-nickname" name="nickname" value="${
      this.state.nickname
    }" />
      <div ${styles.selectContainer}>  
        ${new SelectBox({
          id: 'setting-number',
          label: 'Number',
          name: 'number',
          range: 10,
          selectedValue: +this.state.number,
          onChange: this.onChangeNumber.bind(this),
        }).render()}
        ${new SelectBox({
          id: 'setting-day',
          label: 'Day',
          name: 'day',
          range: 7,
          selectedValue: +this.state.day,
          onChange: this.onChangeDay.bind(this),
        }).render()}
      </div>
      <span ${styles.inputLabel}>Platforms</span>
      <div ${styles.platformContainer}>
        ${PLATFORMS.map(
          ({ id, content }) => `<label ${
            this.state.platform.includes(id) ? styles.platformLabel.checked : styles.platformLabel.unchecked
          } for=${content}>
              <img ${styles.platformImg} src='../../../assets/${id}.svg' />
              <span>${content}</span>
            </label>
            <input class="platform-input" ${
              styles.platformItem
            } value=${id} type="checkbox" id=${content} name="platform" ${
            this.state.platform.includes(id) ? 'checked' : ''
          } />`
        ).join('')}
      </div>
        ${new StyledButton({
          text: '저장',
          style: this.isDirty() && this.state.isValid ? styles.settingBtn : styles.disabledBtn,
          onClick: this.onSubmit.bind(this),
          disabled: !this.isDirty() || !this.state.isValid,
        }).render()}
    </form>
      ${new StyledButton({
        text: '로그아웃',
        style: styles.settingBtn,
        onClick: async () => {
          await requestLogout();
          router.go('/');
        },
      }).render()}
      <p ${this.state.isSaving ? styles.saveMsg.hide : styles.saveMsg.show}>
        저장되었습니다!!
      </p>
    </div>`;
  }

  isDirty() {
    const isDirtyPlatform = () =>
      this.state.platform.length !== userInfo.setting.platform.length ||
      this.state.platform.some(item => !userInfo.setting.platform.includes(item));

    return (
      this.state.nickname !== userInfo.setting.nickname ||
      this.state.number !== userInfo.setting.number ||
      this.state.day !== userInfo.setting.day ||
      isDirtyPlatform()
    );
  }

  onChangeNumber(e) {
    this.setState({ number: e.target.value });
  }

  onChangeDay(e) {
    this.setState({ day: e.target.value });
  }

  onChangeNickname(e) {
    this.setState({ nickname: e.target.value, isValid: this.state.nickname.length !== 0 });
  }

  onChangePlatform(e) {
    const target = e.target.value;
    const newPlatform = this.state.platform.includes(target)
      ? this.state.platform.filter(item => item !== target)
      : [...this.state.platform, target];
    this.setState({ platform: newPlatform, isValid: newPlatform.length !== 0 });
  }

  async onSubmit(e) {
    e.preventDefault();

    await requestSaveSetting(this.state);
    this.setState({ ...this.state, isValid: true, isSaving: false });
    setTimeout(() => {
      this.setState({ isSaving: true });
    }, 1000);
  }

  addEventListener() {
    return [
      {
        type: 'input',
        selector: '.nickname-input',
        handler: this.onChangeNickname.bind(this),
      },
      {
        type: 'input',
        selector: '.platform-input',
        handler: this.onChangePlatform.bind(this),
      },
      {
        type: 'keydown',
        selector: 'input',
        handler: e => {
          if (e.key === 'Enter') e.preventDefault();
        },
      },
    ];
  }
}

export default UserSetting;
