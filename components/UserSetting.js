import Component from '../library/Component.js';

class UserSetting extends Component {
  domStr() {
    return `
        <form class="setting-form">
          <label for="days">몇일마다</label>
          <input type="range" min=1 max=7 id="days" />
          <label for"number">몇문제씩</label>
          <input type="range" min=1 max=7 id="number" />
          <input type="checkbox" name="platform" id="baekjoon" />백준
          <input type="checkbox" name="platform" id="programmers" />프로그래머스
          <input type="checkbox" name="platform" id="leetcode" />리트코드
        </form>`;
  }
}

export default UserSetting;
