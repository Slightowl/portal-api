import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000

    const date = new Date(value);
    const date_ms = date.getTime();

    const today = new Date();
    const today_ms = today.getTime();
    
    const seconds = Math.round((today_ms - date_ms) / 1000);

    if (seconds < 20) {
      return 'just now';
    }
    else if (seconds < 60) {
      return 'about a minute ago';
    }

    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return minutes === 1
        ? `${minutes} minute ago`
        : `${minutes} minutes ago`;
    }

    const isToday = today.toDateString() === date.toDateString();
    if (isToday) {
      return 'Today'
    }

    const yesterday = new Date(today_ms - DAY_IN_MS);
    const isYesterday = yesterday.toDateString() === date.toDateString();
    if (isYesterday) {
      return 'Yesterday'
    }

    const daysDiff = Math.round((today_ms - date_ms) / (1000 * 60 * 60 * 24));
    if (daysDiff < 30) {
      return daysDiff === 1
        ? `${daysDiff} day ago`
        : `${daysDiff} days ago`;
    }

    const monthsDiff = today.getMonth() - date.getMonth() + (12 * (today.getFullYear() - date.getFullYear()));
    if (monthsDiff < 12) {
      return monthsDiff === 1
        ? `${monthsDiff} month ago`
        : `${monthsDiff} months ago`;
    }

    const yearsDiff = today.getFullYear() - date.getFullYear();

    return yearsDiff === 1
      ? `${yearsDiff} year ago`
      : `${yearsDiff} years ago`;
  }
}
