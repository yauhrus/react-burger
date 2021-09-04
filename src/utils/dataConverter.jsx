import {
  differenceInDays, 
  isSameDay, 
  format, 
  subDays
} from 'date-fns';

export default function dataConverter(comparisonDate) {
  const today = new Date();
  const yesterday = subDays(today, 1);

  let result = '';
  if (isSameDay(comparisonDate, today)) {
    result = 'Сегодня';
  } else if (isSameDay(comparisonDate, yesterday)) {
    result = 'Вчера';
  } else if (differenceInDays(today, comparisonDate) <= 7) {
    const daysWord = differenceInDays(today, comparisonDate) <= 5 ? 'дня' : 'дней';
    result = `${differenceInDays(today, comparisonDate)} ${daysWord} назад`;
  } else {
    result = format(comparisonDate, 'dd.MM.yyyy')
  }
  result += `, ${format(comparisonDate, 'HH:mm')} i-${format(comparisonDate, 'O')}`;
  return result;
}