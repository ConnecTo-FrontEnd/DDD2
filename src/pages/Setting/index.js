import Component from '../../library/Component.js';
import { Header } from '../../shared/components/index.js';
import { commonStyles } from '../../shared/styles/theme.js';
import { UserSetting } from './components/index.js';

class Setting extends Component {
  domStr() {
    return `
      <div >
        ${new Header().render()}
        ${new UserSetting().render()}
      </div>`;
  }
}

export default Setting;
