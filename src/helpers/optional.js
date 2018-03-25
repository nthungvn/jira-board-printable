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
    return NullUtils.isNull(this.value);
  }

  ifPresent(consumer) {
    if (this.isPresent()) {
      consumer(this.value);
    }
  }

  map(name) {
    if (this.isPresent()) {
      let match = name.match(/(\w*)\[(\d*)\]|(\w*)/);
      if (match[2]) {
        return Optional.ofNullable(this.value[match[1]][parseInt(match[2])]);
      }
      return Optional.ofNullable(this.value[match.input]);
    }
    return Optional.empty();
  }

  orElse(value) {
    return this.isPresent() ? this.value : value;
  }
}
