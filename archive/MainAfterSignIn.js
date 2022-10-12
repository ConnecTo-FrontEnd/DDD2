import Component from '../library/Component.js';
import { Profile, ProblemList } from '../components/index.js';

class MainAfterSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: [
        { link: '/', level: 1, title: '사다리꼴 넓이' },
        { link: '/', level: 3, title: 'CBD' },
        { link: '/', level: 2, title: '프록시' },
        { link: '/', level: 2, title: '화이트갈릭 싸이버거' },
        { link: '/', level: 3, title: '이태리 부대찌개' },
        { link: '/', level: 4, title: '부대전골' },
        { link: '/', level: 5, title: '맘스터치' },
      ],
    };
  }

  addEventListener() {
    return [
      {
        type: 'click',
        selector: 'button',
        handler: e => {
          this.removeTop.call(this);
        },
      },
    ];
  }

  removeTop() {
    this.setState({ problems: this.state.problems.slice(1) });
  }

  domStr() {
    return `
      <div>
        <button>맨위 지우기</button>
        ${new Profile().render()}
        ${new ProblemList({ ...this.props, state: this.state }).render()};
      </div>
    `;
  }
}

export default MainAfterSignIn;
