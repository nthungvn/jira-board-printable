export default class NullUtils {
  static isNotNull(value) {
    return value != null;
  }

  static isNull(value) {
    return value == null;
  }
}
