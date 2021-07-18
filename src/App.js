import { initRouter } from './core/HistoryRouter';
import About from './components/About';
import Main from './components/Main';

const routes = [
  { path: '/', component: Main },
  { path: '/about', component: About },
];

export default function App($app) {
  initRouter({ $app, routes });
}
