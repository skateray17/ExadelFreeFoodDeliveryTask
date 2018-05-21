class EventBus {
  constructor() {
    if (!EventBus.instance) {
      this.topics = {};
      EventBus.instance = this;
    }
    return EventBus.instance;
  }

  subscribe(topic, listener) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(listener);
  }

  publish(topic, data) {
    if (!this.topics[topic] || this.topics[topic].length < 1) {
      return;
    }
    this.topics[topic].forEach((listener) => {
      listener(data || {});
    });
  }
}

const eventBus = new EventBus();
Object.freeze(eventBus);

export default eventBus;
