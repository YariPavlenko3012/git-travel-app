export default class Calendar {
    static daysInMonth(dateObj) {
        const currentYear = dateObj.getFullYear();
        const currentMonth = dateObj.getMonth() + 1;

        return new Date(currentYear, currentMonth, 0).getDate();
    }
}
