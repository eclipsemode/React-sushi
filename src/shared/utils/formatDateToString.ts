function formatDateToString(date: Date) {
  const localeDate: Date = new Date(date);

  return localeDate.toLocaleDateString().split('.').join('-')
}

export default formatDateToString;