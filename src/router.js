export default class Router {
  constructor(routes, element) {
    this.routes = routes;
    this.rootElement = element;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', (url) => { this.render(url); });
    this.render(window.location.hash);
  }

  navigate(path) {
    window.location.hash = path;
  }

  cleanContainer() {
    if (this.rootElement.hasChildNodes()) {
      this.rootElement.removeChild(this.rootElement.childNodes[0]);
    }
  }

  render(url) {
    if (url.newURL) {
      const temp = url.newURL.split('/')[3];

      if (temp === '') {
        this.navigate(this.routes.rootPath);
      }

      const props = url.newURL.split('/')[4];

      this.cleanContainer();

      const field = temp.substring(1);
      if (this.routes.hasOwnProperty(field)) {
        const component = new this.routes[field].component().render(this.rootElement, this, {});
      } else {
        window.location.hash = 'error';
      }
    } else {
      this.navigate(this.routes.rootPath);
    }
  }
}
