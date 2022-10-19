import Component from '../../../library/Component.js';
import { requestLogout, requestSaveSetting, userInfo } from '../../../shared/store/userInfo.js';
import { SelectBox } from './index.js';
import { router } from '../../../shared/router/index.js';
import StyledButton from '../../../shared/components/StyledButton.js';
import styled from '../../../library/styled.js';
import theme from '../../../shared/styles/theme.js';
import Title from '../../../shared/components/Title.js';
import PlatformContainer from './PlatformContainer.js';
import PopUpMsg from '../../../shared/components/PopupMsg.js';

const styles = {
  container: styled({
    display: 'flex',
    'flex-direction': 'column',
    padding: '0 2rem',
    'max-width': '50rem',
    margin: '0 auto',
  }),
  profileImage: styled({
    width: '7rem',
    'border-radius': '100%',
    margin: '2rem auto',
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
};

class UserSetting extends Component {
  constructor(props) {
    super(props);
    this.state = { ...userInfo.setting, isPopup: false, isValid: true };
  }

  domStr() {
    return `
    <div ${styles.container}>
    ${new Title({ title: 'Setting' }).render()}
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
        ${new PlatformContainer({ platform: this.state.platform, onChange: this.onChangePlatform.bind(this) }).render()}
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
      ${new PopUpMsg({ msg: '저장되었습니다!!', isPopup: this.state.isPopup }).render()}
    </div>`;
  }

  isDirty() {
    const isDirtyPlatform = () =>
      this.state.platform.length !== userInfo.setting.platform.length ||
      this.state.platform.some(item => !userInfo.setting.platform.includes(item));
    return (
      this.state.nickname !== userInfo.setting.nickname ||
      +this.state.number !== +userInfo.setting.number ||
      +this.state.day !== +userInfo.setting.day ||
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
    this.setState({ nickname: e.target.value, isValid: e.target.value.length });
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
    this.setState({ ...this.state, isValid: true, isPopup: true });
    setTimeout(() => {
      this.setState({ isPopup: false });
    }, 1200);
  }

  addEventListener() {
    return [
      {
        type: 'input',
        selector: '.nickname-input',
        handler: this.onChangeNickname.bind(this),
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
