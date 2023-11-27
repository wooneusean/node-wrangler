export default class EventEmitter {
  /** @type {Map<string, Set<(data: any) => void>>} */
  #listeners;

  /**
   *
   * @param {string} event event
   * @param {(data: any) => void} callback callback
   */
  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }

    this.#listeners.get(event).add(callback);
  }

  off(event, callback) {
    const callbacks = this.#listeners.get(event);

    if (callbacks) {
      callbacks.delete(callback);
    }

    if (Object.keys(callbacks).length === 0) {
      this.#listeners.delete(event);
    }
  }

  emit(event, data) {
    const callbacks = this.#listeners.get(event);

    if (callbacks) {
      callbacks.forEach((c) => c(data));
    }
  }
}
