import NullUtils from './null-utils';

export default class Optional {
  constructor(value) {
    this.value = value;
  }

  /**
   * Returns an empty Optional instance. No value is present for this Optional.
   */
  static empty() {
    return new Optional(null);
  }

  /**
   * Returns an Optional describing the specified value, if non-null, otherwise returns an empty Optional.
   * @param {any} value
   */
  static ofNullable(value) {
    return new Optional(value);
  }

  /**
   * Return true if there is a value present, otherwise false.
   */
  isPresent() {
    return NullUtils.isNotNull(this.value);
  }

  /**
   * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
   * @param {Function} consumer block to be executed if a value is present
   */
  ifPresent(consumer) {
    if (this.isPresent()) {
      consumer(this.value);
    }
  }

  /**
   * Maps a original data to another. It is modified by mapper
   * @param {Function} mapper A function recieve T and return R
   * @example map(item => item.value)
   * @returns Data are mapped
   */
  map(mapper) {
    if (this.isPresent()) {
      return Optional.ofNullable(mapper(this.value))
    }
    return Optional.empty();
  }

  /**
   * Maps json object to sub key
   * @param {String} name A string like we access to sub key in json object
   * @example mapJson("parent.sub.subOfSub")
   * @deprecated Uses method map instead if we want to get a properties in json object
   */
  mapJson(name) {
    if (this.isPresent()) {
      let match = name.match(/(\w*)\[(\d*)\]|(\w*)/);
      if (match[2]) {
        return Optional.ofNullable(this.value[match[1]][parseInt(match[2])]);
      }
      return Optional.ofNullable(this.value[match.input]);
    }
    return Optional.empty();
  }

  /**
   * If a value is present, and the value matches the given predicate,
   * return an Optional describing the value, otherwise return an empty Optional.
   * @param {Function} predicate a predicate to apply to the value, if present
   * @returns an Optional describing the value of this Optional if a value is present
   * and the value matches the given predicate, otherwise an empty Optional
   */
  filter(predicate) {
    if (this.isPresent()) {
      return predicate(this.value) ? this : Optional.empty();
    }
    return this;
  }

  /**
   * If a value is present in this Optional, returns the value, otherwise throws ReferenceError.
   */
  get() {
    if (this.isPresent()) {
      return this.value;
    }
    throw new ReferenceError("No value present");
  }

  /**
   * Return the value if present, otherwise return other.
   * @param {any} other the value to be returned if there is no value present, may be null
   */
  orElse(other) {
    return this.isPresent() ? this.value : other;
  }

  /**
   * Return the value if present, otherwise invoke other and return the result of that invocation.
   * @param {Function} other a Supplier whose result is returned if no value is present
   */
  orElseGet(other) {
    return this.isPresent() ? this.value : other();
  }
}
