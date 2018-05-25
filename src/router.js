import { getUrlParams } from './common/utils';

export default class Router {
  constructor(routes, element) {
    this.routes = routes;
    this.rootElement = element;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', (url) => { this.render(url.newURL); });
    this.render(window.location.href);
  }

  navigate(path) {
    window.location.hash = path;
  }

  cleanContainer() {
    if (this.component && typeof this.component.destroy === 'function') {
      this.component.destroy();
    }
    while (this.rootElement.hasChildNodes()) {
      this.rootElement.removeChild(this.rootElement.childNodes[0]);
    }
  }

  checkGuards(guards, field) {
    const guardsPromises = [];
    for (let i = 0; i < guards.length; i++) {
      // ?????????
      guardsPromises.push(guards[i](field));
    }
    Promise.all(guardsPromises)
      .then((resolvedGuards) => {
        resolvedGuards.forEach((resolvedGuard) => {
          if (!resolvedGuard.allow) {
            setTimeout(() => this.navigate(resolvedGuard.path), 0);
          }
        });
      });
  }

  render(url) {
    if (url) {
      const temp = url.split('/')[3];
      if (temp === '') {
        this.navigate(this.routes.rootPath);
        return;
      }

      const props = getUrlParams();

      this.cleanContainer();

      const hash = temp.substring(0, 1);
      if (hash !== '#') {
        this.navigate('error');
      }
      const field = temp.substring(1);
      if (this.routes.hasOwnProperty(field)) {
        // ?????????
        this.checkGuards(this.routes[field].guards, field);
        const ComponentConstructor = this.routes[field].component;
        this.component = new ComponentConstructor(this);
        this.component.render(this.rootElement, props);
      } else {
        this.navigate('error');
      }
    } else {
      this.navigate(this.routes.rootPath);
    }
  }
}
