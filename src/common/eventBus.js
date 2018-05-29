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
    return this.unsubscribe.bind(this, topic, listener);
  }

  unsubscribe(topic, listener) {
    if (this.topics[topic]) {
      const index = this.topics[topic].indexOf(listener);
      if (index > -1) {
        this.topics[topic].splice(index, 1);
      }
    }
  }

  publish(topic, data) {
    if (!this.topics[topic] || this.topics[topic].length < 1) {
      return;
    }
    this.topics[topic].forEach((listener) => {
      listener(arguments.length < 2 ? {} : data);
    });
  }
}

const eventBus = new EventBus();
Object.freeze(eventBus);

export { eventBus };
