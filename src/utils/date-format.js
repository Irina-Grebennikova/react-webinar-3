/**
 * Форматирование даты и времени
 * @param value {Date}
 * @param options {Object}
 * @returns {String}
 */
export default function dateTimeFormat(date, locale = "ru-RU", options) {
  if (!options) {
    options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  }
  return new Intl.DateTimeFormat(locale, options).format(date).replace("г.", "");
}
