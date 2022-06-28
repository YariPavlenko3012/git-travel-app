/**
 * Класс для упрощения работы с датами
 */
export default class DateTime {

    /**
     * Преобразовывает дату в формат Y-m-d
     * @param {Date} dateObj
     * @return string
     */
    static dateToYmd(dateObj) {
        const month = (dateObj.getMonth() + 1) <= 9 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
        const date = dateObj.getDate() <= 9 ? '0' + dateObj.getDate() : dateObj.getDate();

        return [dateObj.getFullYear(), month, date].join('-');
    }

    /**
     * Преобразовывает время в формат H:i:s
     * @param {Date} dateObj
     * @return string
     */
    static timeToHis(dateObj) {
        const timeHi = DateTime.timeToHi(dateObj);
        const seconds = dateObj.getSeconds() <= 9 ? '0' + dateObj.getSeconds() : dateObj.getSeconds();

        return [timeHi, seconds].join(':');
    }

    /**
     * Преобразовывает дату в формат Y-m-d
     * @param {Date} dateObj
     * @return string
     */
    static timeToHi(dateObj) {
        const hours = dateObj.getHours() <= 9 ? '0' + dateObj.getHours() : dateObj.getHours();
        const minutes = dateObj.getMinutes() <= 9 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();

        return [hours, minutes].join(':');
    }

    /**
     * Преобразовывает дату в формат Y-m-d
     * @param {Date} dateObj
     * @return string
     */
    static dateToYmdHis(dateObj) {
        return DateTime.dateToYmd(dateObj) + ' ' + DateTime.timeToHis(dateObj);
    }
}
