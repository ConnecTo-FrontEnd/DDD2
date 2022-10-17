import Component from '../library/Component.js';
import Input from './Input.js';
import SelectBox from './SelectBox.js';
// import { SettingScheme } from '../schema/schema.js';

class UserSetting extends Component {
  addEventListener() {
    return [
      {
        type: 'submit',
        selector: '.setting-form',
        handler: e => {
          e.preventDefault();
          // 이미지 경로는 찾아보고 추가할 것
          const data = Array.from({ length: e.target.length }).map((_, idx) => {
            const value =
              e.target[idx].type === 'text' || e.target[idx].type === 'select-one'
                ? e.target[idx].value
                : e.target[idx].type === 'checkbox'
                ? e.target[idx].checked
                  ? e.target[idx].id
                  : ''
                : '';
            const key = e.target[idx].name;
            return [key, value];
          });
          console.log(data);
        },
      },
    ];
  }

  domStr() {
    // prettier-ignore
    return `
    <form action="" class="setting-form">
      ${new Input({scheme: { type: 'file', id: 'setting-profile', content: '이미지 파일 선택', name: 'profile', accept:"image/*"}}).render()}
      ${new Input({scheme: { type: 'text', id: 'setting-nickname', content: 'Nickname', name: 'nickname', value: '' }}).render()}
      ${new SelectBox({ scheme: { id: 'setting-number', content: 'Number', name: 'number', num: '10' } }).render()}
      ${new SelectBox({ scheme: { id: 'setting-day', content: 'Day', name: 'day', num: '7' } }).render()}
      <fieldset>
        <legend>Platforms</legend>
        <div>
          ${new Input({scheme: { type: 'checkbox', id: 'all', content: '모든 플랫폼', name: 'platform', value: 'all' }}).render()}
          ${new Input({scheme: {type: 'checkbox',id: 'programmars',content: '프로그래머스',name: 'platform',value: 'programmars'}}).render()}
          ${new Input({scheme: { type: 'checkbox', id: 'baekjoon', content: '백준', name: 'platform', value: 'baekjoon' }}).render()}
          ${new Input({scheme: { type: 'checkbox', id: 'leetcode', content: 'LeetCode', name: 'platform', value: 'leetcode' }}).render()}      
        </div>
      </fieldset>
      <button type="submit">저장</button>
  </form>`;
  }
}

export default UserSetting;

/*
// SettingScheme 순회하면서 만드는 방식.
// 조건문이 많아져서 오히려 덜 직관적으로 보인다.
// prettier-ignore
return `
  <form action="" class="setting-form">
    ${Object.values(this.settingScheme).map(scheme => {
      if(scheme.type==='selectbox') return new SelectBox({scheme}).render();
      if(scheme.length) return `
        <fieldset>
          <legend>Platforms</legend>
          <div>
            ${scheme.map(_scheme=>new Input({scheme:_scheme}).render()).join('')}
          </div>
        </fieldset>
      `
      return new Input({scheme}).render()
    }).join()}
    <button type="submit">저장</button>
  </form>`;
*/
