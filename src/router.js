export default class Router {
  constructor(routes, element) {
    this.routes = routes;
    this.rootElement = element;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', (url) => { this.render(url); });
    window.location.hash = 'login';
  }

  render(url) {
    const temp = url.newURL.split('/')[3];
    const props = url.newURL.split('/')[4];

    // Hide whatever page is currently shown.
    if (this.rootElement.hasChildNodes()) {
      this.rootElement.removeChild(this.rootElement.childNodes[0]);
    }
    const field = temp.substring(1);
    if (this.routes.hasOwnProperty(field)) {
      const component = new this.routes[field].component().render(this.rootElement, {});
    } else {
      window.location.hash = 'error';
    }
  }
}
