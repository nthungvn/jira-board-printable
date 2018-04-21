export default class NullUtils {
  static isNull(value) {
    return value ? true : false;
  }

  static isNotNull(value) {
    return !this.isNull(value);
  }
}
