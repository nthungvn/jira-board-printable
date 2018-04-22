export default class NullUtils {
  static isNotNull(value) {
    return value ? true : false;
  }

  static isNull(value) {
    return !this.isNotNull(value);
  }
}
