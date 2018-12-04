import moment from "moment";

export const current = moment().format('YYYY-MM-DD HH:mm:ss');

/** FROM (WEEK) **/
export const previousMonday = moment().startOf('isoweek').subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss');
export const previousSunday = moment().endOf('isoweek').subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss');

/** TO (WEEK) **/
export const currentMonday = moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss');

/** FROM (MONTH) **/
export const firstDayOfPrevMonth = moment().startOf('month').subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss');
export const lastDayOfPrevMonth = moment().endOf('month').subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss');

/** TO (MONTH) **/
export const firstDayOfCurrentMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');

/** FROM (QUARTERLY) **/
export const firstDayOfPrevQuarterly = moment().startOf('month').subtract(5, 'month').format('YYYY-MM-DD HH:mm:ss');
export const lastDayOfPrevQuarterly = moment().endOf('month').subtract(3, 'month').format('YYYY-MM-DD HH:mm:ss');

/** TO(QUARTERLY)  **/
export const firstDayOfCurrentQuarterly = moment().startOf('month').subtract(2, 'month').format('YYYY-MM-DD HH:mm:ss');