module.exports = class Enum {
  constructor(data) {
    this.data = data;
    Object.keys(this.data).map((key) => this.set(key));
  }

  set(key) {
    this[key] = this.data[key];
  }

  getKeys() {
    return Object.keys(this.data);
  }

  getValues() {
    return Object.values(this.data);
  }

  /**
   * @returns key or undefined
   */
  getKey(value) {
    return Object.keys(this.data).find((key) => this.data[key] === value);
  }

  /**
   * @returns value or undefined
   */
  getValue(key) {
    return this[key];
  }

  /**
   * @returns bool
   */
  hasKey(key) {
    return this[key] !== undefined;
  }

  /**
   * @returns bool
   */
  hasValue(value) {
    return this.getKey(value) !== undefined;
  }

  /**
   * @returns array
   */
  toArray() {
    return Object.keys(this.data).map((key) => {
      const element = {
        key,
        value: this.data[key],
      };
      return element;
    });
  }
};
