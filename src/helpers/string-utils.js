export default class StringUtils {
  static isBlank(value) {
    return !value || /^\s*$/.test(value);
  }

  static isNotBlank(value) {
    return !StringUtils.isBlank(value);
  }

  static isEmpty(value) {
    return !value || value.length === 0;
  }

  static isNotEmpty(value) {
    return !StringUtils.isEmpty(value);
  }
}
