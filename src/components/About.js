import Component from '../core/Component';
import { $router } from '../core/HistoryRouter';

export default class About extends Component {
  template() {
    return `
      <div id="main">main</div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#main', (e) => {
      try {
        $router.push('/');
      } catch (e) {
        console.log(e);
      }
    });
  }
}
