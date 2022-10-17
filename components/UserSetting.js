import Component from '../library/Component.js';
import SelectBox from './SelectBox.js';
import { requestLogout, requestSaveSetting, userInfo } from '../store/userInfo.js';
import PLATFORMS from '../constants/platforms.js';

class UserSetting extends Component {
  domStr() {
    const { nickname, day, number, platform } = userInfo.setting;

    return `
    <div>
      <button class="logout-button">로그아웃</button>
      <image src="./../assets/profile.svg" />
      <form action="POST">
        <label for="setting-nickname">닉네임</label>
        <input value=${nickname} type="text" id="setting-nickname" name="nickname" />
        ${new SelectBox({
          scheme: {
            id: 'setting-number',
            content: 'Number',
            name: 'number',
            num: 10,
            checkedId: +number,
            type: 'number',
          },
        }).render()}
        ${new SelectBox({
          scheme: { id: 'setting-day', content: 'Day', name: 'day', num: 7, checkedId: +day, type: 'number' },
        }).render()}

        <fieldset>
          <legend>Platforms</legend>
          ${PLATFORMS.map(
            ({ id, content }) => `<label for=${id}>${content}</label>
            <input value=${id} type="checkbox" id=${content} name="platform" ${
              platform.includes(id) ? 'checked' : ''
            } />`
          ).join('')}
        </fieldset>
        <button type="submit">저장</button>
      </form>
    </div>`;
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: '.logout-button',
        handler: async e => {
          await requestLogout();
        },
      },
      {
        type: 'keydown',
        selector: 'input',
        handler: e => {
          if (e.key === 'Enter') e.preventDefault();
        },
      },
      {
        type: 'submit',
        selector: 'form',
        handler: async e => {
          e.preventDefault();
          const payload = {};
          [...new FormData(e.target)].forEach(([key, value]) => {
            if (key === 'platform') {
              payload[key] = payload[key] ? [...payload[key], value] : [value];
            } else {
              payload[key] = value;
            }
          });

          await requestSaveSetting(payload);
        },
      },
    ];
  }
}

export default UserSetting;
