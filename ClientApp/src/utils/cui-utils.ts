import { format, isDate, parseISO } from "date-fns";
import { isNullOrWhitespace, toTitleCase } from "./string-utils";

export const getAge = (dob: Date | string, refDate?: Date | string): string => {
  let now = refDate || new Date();

  const ageValues = ageInYearsMonthsDays(dob, now);
  const yearAge = ageValues.years;
  const monthAge = ageValues.months;
  const dateAge = ageValues.days;

  // Adults (over 18 years): **years**.
  if (yearAge >= 18) {
    return yearAge + 'y';
  }

  // Children over two years: **years and months**.
  if (yearAge >= 2) {
    return yearAge + 'y' + (monthAge ? ' ' + monthAge + 'm' : '');
  }
  // Children 12 to 24 months: **months and days**.
  if (yearAge === 1) {
    return (12 + monthAge) + 'm' + (dateAge ? ' ' + dateAge + 'd' : '');
  }
  // Calculate age measured in simple units.
  if (typeof dob === 'string') {
    dob = new Date(dob);
  }
  if (typeof now === 'string') {
    now = new Date(now);
  }
  const age = (now as any) - (dob as any);
  const hourAge = Math.floor(age / (1000 * 60 * 60));
  let dayAge = Math.floor(hourAge / 24);
  const weekAge = Math.floor(dayAge / 7);

  // Children four weeks to one year: **weeks and days**.
  if (weekAge >= 4) {
    dayAge -= weekAge * 7;
    return weekAge + 'w' + (dayAge ? ' ' + dayAge + 'd' : '');
  }

  // Children two days to four weeks: **days**.
  if (dayAge >= 2) {
    return dayAge + 'd';
  }

  // Children two to 24 hours: **hours**.
  if (hourAge >= 2) {
    return hourAge + 'hrs';
  }

  // Children under two hours: **minutes**.
  return Math.floor(age / (1000 * 60)) + 'min';
};

export const formatNhsNumber = (nhsNumber: string): string => {
  if (!nhsNumber || isNullOrWhitespace(nhsNumber)) {
    return 'Not Available';
  }

  if (nhsNumber.length === 10) {
    return `${nhsNumber.substring(0, 3)} ${nhsNumber.substring(3, 6)} ${nhsNumber.substring(6, 10)}`;
  }

  return nhsNumber;
};

export const formatDisplayName = (given: string, family: string, title?: string): string => {
  let name = isNullOrWhitespace(given)
    ? (family ? family.toUpperCase() : '')
    : (family ? family.toUpperCase() + ', ' : '') + toTitleCase(given);

  // add title in brackets if specified
  if (title && !(isNullOrWhitespace(title))) {
    name += ` (${toTitleCase(title)})`;
  }

  return name;
};

export const formatDisplayDate = (date: Date | string): string => {
  if (isDate(date)) {
    return format(date as Date, 'dd-MMM-yyyy');
  }

  return format(parseISO(date.toString()), 'dd-MMM-yyyy');
}

export const formatDisplayDateTime = (date: Date | string): string => {
  if (isDate(date)) {
    return format(date as Date, 'dd-MMM-yyyy HH:mm');
  }

  return format(parseISO(date.toString()), 'dd-MMM-yyyy HH:mm');
}

const ageInYearsMonthsDays = (dob: string | Date, now?: string | Date) => {
  if (typeof dob === 'string') {
    dob = new Date(dob);
  }

  if (typeof dob === 'undefined' || (isDate(dob) === false)) {
    throw Error('Given date of birth is undefined or invalid.');
  }

  // If `now` is not specified, use the current time.
  if (typeof now === 'undefined' || now === '') {
    now = new Date();
  }
  if (typeof now === 'string') {
    now = new Date(now);
    if (isDate(now) === false) {
      throw Error('Given reference date is undefined or invalid.');
    }
  }
  // Get the number of days in a specific month.
  const daysInMonth = (iMonth: any, iYear: any) => {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  };

  // Calculate calendar age. This is complex because years and months are not constant lengths.
  const yearNow = now.getFullYear();
  const monthNow = now.getMonth();
  const dateNow = now.getDate();

  let yearAge = yearNow - dob.getFullYear();
  let monthAge = monthNow - dob.getMonth();
  let dateAge = dateNow - dob.getDate();

  if (dateAge < 0) {
    monthAge--;
    dateAge += daysInMonth(yearNow, monthNow - 1);
  }

  if (monthAge < 0) {
    yearAge--;
    monthAge += 12;
  }

  return ({
    years: yearAge,
    months: monthAge,
    days: dateAge
  });
};
