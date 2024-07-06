export default function checkDateIsToday(date: Date): boolean {
  const currentDay = new Date().getUTCDay();
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getUTCFullYear();

  const dateDay = new Date(date).getUTCDay();
  const dateMonth = new Date(date).getUTCMonth();
  const dateYear = new Date(date).getUTCFullYear();

  if (
    currentDay === dateDay &&
    currentMonth === dateMonth &&
    currentYear === dateYear
  ) {
    return true;
  }

  return false;
}
