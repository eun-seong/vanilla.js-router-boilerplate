import Component from '../core/Component';
import { $router } from '../core/HistoryRouter';

export default class Main extends Component {
  template() {
    return `
      <div id="about">about</div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#about', (e) => {
      $router.push('/about');
    });
  }
}
