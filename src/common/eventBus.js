let topics = {};

export default class EventBus {
  static subscribe(topic, listener) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push(listener);
  }

  static publish(topic, data) {
    if (!topics[topic] || topics[topic].length < 1) {
      return;
    }
    topics[topic].forEach((listener) => {
      listener(data || {});
    });
  }
}