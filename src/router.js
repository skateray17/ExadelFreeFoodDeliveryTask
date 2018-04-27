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
    while (this.rootElement.hasChildNodes()) {
      this.rootElement.removeChild(this.rootElement.childNodes[0]);
    }
  }

  render(url) {
    if (url) {
      const temp = url.split('/')[3];

      if (temp === '') {
        this.navigate(this.routes.rootPath);
        return;
      }

      const props = url.split('/')[4];

      this.cleanContainer();

      const field = temp.substring(1);
      if (this.routes.hasOwnProperty(field)) {
        const guards = this.routes[field].guards;

        for (let i = 0; i < guards.length; i++) {
          const guard = guards[i];
          const guardResult = guard();
          if (!guardResult.allow) {
            //console.log(guardResult);
            setTimeout(() => this.navigate(guardResult.path), 0);
            break;
          }
        }

        const component = new this.routes[field].component(this).render(this.rootElement, {});
      } else {
        this.navigate('error');
      }
    } else {
      this.navigate(this.routes.rootPath);
    }
  }
}
