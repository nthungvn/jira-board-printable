import NullUtils from './null-utils';

export default class Optional {
  constructor(value) {
    this.value = value;
  }

  static empty() {
    return new Optional(null);
  }

  static ofNullable(value) {
    return new Optional(value);
  }

  isPresent() {
    return NullUtils.isNotNull(this.value);
  }

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

  get() {
    if (this.isPresent()) {
      return this.value;
    }
    throw new ReferenceError("No value present");
  }

  orElse(value) {
    return this.isPresent() ? this.value : value;
  }
}
