export default class StringUtils {
  static isBlank(value) {
    return !value || /^\s*$/.test(value);
  }

  static isNotBlank(value) {
    return !this.isBlank(value);
  }

  static isEmpty(value) {
    return !value || value.length === 0;
  }

  static isNotEmpty(value) {
    return !this.isEmpty(value);
  }
}
