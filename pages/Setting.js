import { Header, UserSetting } from '../components/index.js';
import Component from '../library/Component.js';

class Setting extends Component {
  domStr() {
    return `
    <div>
    ${new Header().render()}
    ${new UserSetting().render()}
    </div>
    `;
  }
}

export default Setting;
