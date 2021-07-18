class HistoryRouter {
  $app = null;
  routes = null;

  constructor({ $app, routes }) {
    this.$app = $app;
    this.generateRoutes(routes);
    this.initEvent();
  }

  generateRoutes(routes) {
    this.routes = {};

    routes.forEach((route) => {
      this.routes[route.path] = route;
    });
  }

  initEvent() {
    window.onpopstate = (e) => {
      const path = window.location.pathname;
      let component = this.routes[path];
      if (!this.hasRoute(path)) {
        console.error('Not found ', path);
        component = this.routes[0];
      }
      this.renderHTML(component);
    };
  }

  onHistoryChangeHandler() {
    const path = window.location.pathname;
    const component = this.routes[path].component;
    this.$app.innerHTML = '';
    new component(this.$app);
  }

  getRoute(path) {
    const route = this.routes[path];
    if (!route) throw new Error(`Not found route: ${path}`);
    return route;
  }

  hasRoute(path) {
    return typeof this.routes[path] !== 'undefined';
  }

  push(path) {
    window.history.pushState({}, path, path);
    this.renderHTML(this.getRoute(path));
  }

  replace(path) {
    history.replaceState({}, path, path);
  }

  renderHTML(route) {
    this.$app.innerHTML = '';
    new route.component(this.$app);
  }
}

export let $router;

export function initRouter({ $app, routes }) {
  const router = new HistoryRouter({ $app, routes });
  $router = {
    push: (path) => router.push(path),
    replace: (path) => router.replace(path),
  };
  router.onHistoryChangeHandler();
}
