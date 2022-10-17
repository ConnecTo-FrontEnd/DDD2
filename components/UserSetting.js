import Component from '../library/Component.js';
import styled from '../library/styled.js';
import { requestLogout, requestSaveSetting, userInfo } from '../store/userInfo.js';
import PLATFORMS from '../constants/platforms.js';

class UserSetting extends Component {
  domStr() {
    const { nickname, day, number, platform } = userInfo.setting;

    return `
    <div>
      <button class="logout-button">로그아웃</button>
      <image src="./../assets/profile.svg" />
      <form>
        <label for="setting-nickname">닉네임</label>
        <input value=${nickname} type="text" id="setting-nickname" name="nickname" />
        ${this.SelectBox({
          id: 'setting-number',
          content: 'Number',
          name: 'number',
          range: 10,
          selectedValue: +number,
        })}
        ${this.SelectBox({
          id: 'setting-day',
          content: 'Day',
          name: 'day',
          range: 7,
          selectedValue: +day,
        })}

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
        handler: async () => {
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
          const payload = [...new FormData(e.target)].reduce(
            (acc, [k, v]) => {
              acc[k] = k === 'platform' ? [...acc[k], v] : v;
              return acc;
            },
            { platform: [] }
          );

          await requestSaveSetting(payload);
        },
      },
    ];
  }

  SelectBox({ id, content, name, range, selectedValue }) {
    const inputContainer = styled({
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'flex-start',
      gap: '0.5rem',
      margin: '3rem 4rem',
    });

    return `
      <div style="${inputContainer}">
        <label for="${id}">${content}</label>
        <select name="${name}" id="${id}">
          ${Array.from({ length: range })
            .map((_, i) => `<option value="${i + 1}" ${i + 1 === selectedValue ? 'selected' : ''}>${i + 1}</option>`)
            .join('')}  
        </select>
      </div>`;
  }
}

export default UserSetting;
