export default function convertTimeToDateTime(
  time: string,
  day: 'today' | 'tomorrow' = 'today'
) {
  const [hours, minutes] = time.split(':');
  const date = new Date();

  if (day === 'tomorrow') {
    date.setDate(date.getDate() + 1);
  }

  const dateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    +hours,
    +minutes
  );

  return dateTime.toISOString().slice(0, 19).replace('T', ' ');
}
